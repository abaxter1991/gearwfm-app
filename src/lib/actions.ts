'use server'

import prisma from '@/prisma/client'

export async function updateSalesOrderApprovedProof(salesOrderId: string, approvedProof: boolean) {
    await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            approvedProof: approvedProof,
        },
    })
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
}

export async function updateSalesOrderAssembledProduct(assembledProductId: string, allAssembled: boolean) {
    await prisma.salesOrderAssembledProduct.update({
        where: {
            id: assembledProductId,
        },
        data: {
            allAssembled: allAssembled,
        },
    })
}
