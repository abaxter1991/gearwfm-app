'use server'

import { pusherServer } from '~/lib/pusher'
import prisma from '~/prisma/client'
import type { Prisma, SalesOrderStatus } from '@prisma/client'
import type { ProductReceivedFieldName, PusherTriggerDataForProductReceived } from '~/types'

export async function updateSalesOrderStatus(salesOrderId: string, status: SalesOrderStatus) {
    const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { status: status },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
}

export async function updateSalesOrderApprovedProof(salesOrderId: string, approvedProof: boolean) {
    const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { approvedProof: approvedProof },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
}

export async function updateSalesOrderPartsOrdered(salesOrderId: string, partsOrdered: boolean) {
    const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { partsOrdered: partsOrdered },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
}

export async function updateSalesOrderPartsReceived(salesOrderId: string, partsReceived: boolean, runTrigger = true) {
    const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { partsReceived: partsReceived },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    if (runTrigger) {
        await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
    }
}

export async function updateSalesOrderProductsCounted(salesOrderId: string, productsCounted: boolean) {
    const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { productsCounted: productsCounted },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
}

export async function updateSalesOrderProductsShipped(salesOrderId: string, productsShipped: boolean) {
    const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { productsShipped: productsShipped },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
}

export async function updateSalesOrderAssembledProduct(salesOrderId: string, assembledProductId: string, allAssembled: boolean) {
    await prisma.salesOrderAssembledProduct.update({
        where: { id: assembledProductId },
        data: { allAssembled: allAssembled },
    })

    const updatedSalesOrder = await prisma.salesOrder.findUnique({
        where: { id: salesOrderId },
        include: {
            products: { orderBy: { id: 'asc' } },
            assembledProducts: { orderBy: { id: 'asc' } },
        },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
}

export async function updatePartSizeReceived(salesOrderId: string, productId: string, receivedFieldName: ProductReceivedFieldName, received: boolean) {
    const dataToUpdate: Prisma.SalesOrderProductUpdateInput = {}
    dataToUpdate[receivedFieldName] = received

    await prisma.salesOrderProduct.update({
        where: { id: productId },
        data: dataToUpdate,
    })

    const updatedSalesOrder = await prisma.salesOrder.findUnique({
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

    if (updatedSalesOrder) {
        for (const product of updatedSalesOrder.products) {
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
    }

    if (allTrue(allPartsReceived)) {
        await updateSalesOrderPartsReceived(salesOrderId, true, false)
    } else {
        await updateSalesOrderPartsReceived(salesOrderId, false, false)
    }

    const pusherChannel = `${salesOrderId}-${productId}-${receivedFieldName}`
    const pusherDataForProductReceived: PusherTriggerDataForProductReceived = { salesOrderId, productId, receivedFieldName, received }

    await pusherServer.trigger(pusherChannel, 'product-received-updated', pusherDataForProductReceived)
    await pusherServer.trigger(salesOrderId, 'sales-order-updated', updatedSalesOrder)
}
