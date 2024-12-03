'use server'

import { pusherServer } from '~/lib/pusher'
import prisma from '~/prisma/client'
import type { Prisma } from '@prisma/client'
import type { ProductReceivedFieldKeys } from '~/types'

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

export async function updateSalesOrderPartsReceived(salesOrderId: string, partsReceived: boolean) {
    await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: { partsReceived: partsReceived },
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
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

export async function updatePartSizeReceived(salesOrderId: string, productId: string, sizeField: ProductReceivedFieldKeys, received: boolean) {
    console.dir({ salesOrderId, productId, sizeField, received })

    const dataToUpdate: Prisma.SalesOrderProductUpdateInput = {}
    dataToUpdate[sizeField] = received

    await prisma.salesOrderProduct.update({
        where: { id: productId },
        data: dataToUpdate,
    })

    await pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrderId })
}
