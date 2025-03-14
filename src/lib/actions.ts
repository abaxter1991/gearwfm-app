'use server'

import { pusherServer } from '~/lib/pusher'
import prisma from '~/prisma/client'
import type { Prisma, SalesOrderStatus } from '@prisma/client'
import type { ProductReceivedFieldName, PusherTriggerDataForProductReceived } from '~/types'

async function updateSalesOrder(salesOrderId: string, fieldName: keyof Prisma.SalesOrderUpdateInput, value: boolean | SalesOrderStatus, triggerEvent: boolean = true) {
    const data: Prisma.SalesOrderUpdateInput = {}
    data[fieldName] = value

    const updatedSalesOrder = await prisma.salesOrder.update({ where: { id: salesOrderId }, data })

    if (triggerEvent) {
        await triggerSalesOrderUpdate(salesOrderId, updatedSalesOrder)
    }

    return updatedSalesOrder
}

async function triggerSalesOrderUpdate(salesOrderId: string, data: any, event: string = 'sales-order-updated') {
    await pusherServer.trigger(salesOrderId, event, data)
}

export async function changeStatus(salesOrderId: string, status: SalesOrderStatus) {
    await updateSalesOrder(salesOrderId, 'status', status);
}

export async function toggleApprovedProof(salesOrderId: string, approvedProof: boolean) {
    await updateSalesOrder(salesOrderId, 'approvedProof', approvedProof);
}

export async function togglePartsOrdered(salesOrderId: string, partsOrdered: boolean) {
    await updateSalesOrder(salesOrderId, 'partsOrdered', partsOrdered);
}

export async function togglePartsReceived(salesOrderId: string, partsReceived: boolean, triggerEvent = true) {
    await updateSalesOrder(salesOrderId, 'partsReceived', partsReceived, triggerEvent);
}

export async function toggleProductsCounted(salesOrderId: string, productsCounted: boolean) {
    await updateSalesOrder(salesOrderId, 'productsCounted', productsCounted);
}

export async function toggleProductsShipped(salesOrderId: string, productsShipped: boolean) {
    await updateSalesOrder(salesOrderId, 'productsShipped', productsShipped);
}

export async function toggleIsPaid(salesOrderId: string, isPaid: boolean) {
    await updateSalesOrder(salesOrderId, 'isPaid', isPaid);
}

export async function toggleAllAssembled(salesOrderId: string, assembledProductId: string, allAssembled: boolean) {
    await prisma.salesOrderAssembledProduct.update({
        where: { id: assembledProductId },
        data: { allAssembled: allAssembled },
    })

    const updatedSalesOrder = await prisma.salesOrder.findUnique({
        where: { id: salesOrderId },
        include: {
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    await pusherServer.trigger(salesOrderId, 'assembled-product-toggled', updatedSalesOrder)
}

export async function togglePartSizeReceived(salesOrderId: string, productId: string, receivedFieldName: ProductReceivedFieldName, received: boolean) {
    const dataToUpdate: Prisma.SalesOrderProductUpdateInput = {}
    dataToUpdate[receivedFieldName] = received

    await prisma.salesOrderProduct.update({
        where: { id: productId },
        data: dataToUpdate,
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: { id: salesOrderId },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    const allTrue = (arr: boolean[]): boolean => {
        return arr.every(value => value === true)
    }

    const allPartsReceived: boolean[] = []

    if (salesOrder) {
        const { products, assembledProducts: _assembledProducts, ...restSalesOrder } = salesOrder

        for (const product of products) {
            const {
                receivedXS,
                receivedSM,
                receivedMD,
                receivedLG,
                receivedXL,
                received2XL,
                received3XL,
                received4XL,
            } = product

            allPartsReceived.push(allTrue([receivedXS, receivedSM, receivedMD, receivedLG, receivedXL, received2XL, received3XL, received4XL]))
        }

        if (allTrue(allPartsReceived)) {
            await togglePartsReceived(salesOrderId, true, false)
        } else {
            await togglePartsReceived(salesOrderId, false, false)
        }

        const pusherChannel = `${salesOrderId}-${productId}-${receivedFieldName}`
        const pusherDataForProductReceived: PusherTriggerDataForProductReceived = { salesOrderId, productId, receivedFieldName, received }

        await pusherServer.trigger(pusherChannel, 'product-received-updated', pusherDataForProductReceived)
        await pusherServer.trigger(salesOrderId, 'sales-order-updated', restSalesOrder)
    }
}
