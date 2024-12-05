'use server'

import { pusherServer } from '~/lib/pusher'
import prisma from '~/prisma/client'
import type { Prisma } from '@prisma/client'
import type { ProductReceivedFieldName, PusherTriggerDataForProductReceived } from '~/types'

export async function updateSalesOrderApprovedProof(salesOrderId: string, approvedProof: boolean) {
    await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { approvedProof: approvedProof },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
}

export async function updateSalesOrderPartsOrdered(salesOrderId: string, partsOrdered: boolean) {
    await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { partsOrdered: partsOrdered },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
}

export async function updateSalesOrderPartsReceived(salesOrderId: string, partsReceived: boolean, runTrigger = true) {
    await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { partsReceived: partsReceived },
    })

    if (runTrigger) {
        await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
    }
}

export async function updateSalesOrderProductsCounted(salesOrderId: string, productsCounted: boolean) {
    await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { productsCounted: productsCounted },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
}

export async function updateSalesOrderProductsShipped(salesOrderId: string, productsShipped: boolean) {
    await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { productsShipped: productsShipped },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
}

export async function updateSalesOrderAssembledProduct(salesOrderId: string, assembledProductId: string, allAssembled: boolean) {
    await prisma.salesOrderAssembledProduct.update({
        where: { id: assembledProductId },
        data: { allAssembled: allAssembled },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
}

export async function updatePartSizeReceived(salesOrderId: string, productId: string, receivedFieldName: ProductReceivedFieldName, received: boolean) {
    const dataToUpdate: Prisma.SalesOrderProductUpdateInput = {}
    dataToUpdate[receivedFieldName] = received

    await prisma.salesOrderProduct.update({
        where: { id: productId },
        data: dataToUpdate,
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: { id: salesOrderId },
        include: { products: true },
    })

    const allTrue = (arr: boolean[]): boolean => {
        return arr.every(value => value === true)
    }

    const allPartsReceived: boolean[] = []

    if (salesOrder) {
        for (const product of salesOrder.products) {
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
    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
}
