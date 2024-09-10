'use server'

import { pusherServer } from '~/lib/pusher'
import prisma from '~/prisma/client'

export async function updateSalesOrderApprovedProof(salesOrderId: string, approvedProof: boolean) {
    await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            approvedProof: approvedProof,
        },
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

    pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrder })
}

export async function updateSalesOrderPartsOrdered(salesOrderId: string, partsOrdered: boolean) {
    await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            partsOrdered: partsOrdered,
        },
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

    pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrder })
}

export async function updateSalesOrderPartsReceived(salesOrderId: string, partsReceived: boolean) {
    await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            partsReceived: partsReceived,
        },
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

    pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrder })
}

export async function updateSalesOrderProductsCounted(salesOrderId: string, productsCounted: boolean) {
    await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            productsCounted: productsCounted,
        },
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

    pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrder })
}

export async function updateSalesOrderProductsShipped(salesOrderId: string, productsShipped: boolean) {
    await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            productsShipped: productsShipped,
        },
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

    pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrder })
}

export async function updateSalesOrderAssembledProduct(salesOrderId: string, assembledProductId: string, allAssembled: boolean) {
    await prisma.salesOrderAssembledProduct.update({
        where: {
            id: assembledProductId,
        },
        data: {
            allAssembled: allAssembled,
        },
    })

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    })

    pusherServer.trigger(salesOrderId, 'sales-order-updated', { salesOrder })
}
