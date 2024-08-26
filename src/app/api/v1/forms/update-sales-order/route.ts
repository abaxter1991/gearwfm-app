import prisma from '@/prisma/client'
import type { SalesOrderType } from '@/components/forms/sales-order-form'

export async function POST(request: Request) {
    const data: SalesOrderType = await request.json()

    const {
        id: salesOrderId,
        isNewCustomer,
        orderDate,
        dueDate,
        products,
        assembledProducts,
        ...salesOrder
    } = data

    const productsToAssemble: string[] = []

    products.forEach((product) => {
        if (product.item && !productsToAssemble.includes(product.item)) {
            productsToAssemble.push(product.item)
        }
    })

    const newAssembledProducts = productsToAssemble.map((item) => {
        return { item, allAssembled: false }
    })

    const updatedSalesOrder = await prisma.salesOrder.update({
        where: { id: salesOrderId },
        data: {
            ...salesOrder,
            isNewCustomer: Boolean(isNewCustomer),
            orderDate: new Date(orderDate.year, orderDate.month, orderDate.day),
            dueDate: new Date(dueDate.year, dueDate.month, dueDate.day),
            status: 'NEW_ORDER',
            isDraft: true,
            approvedProof: false,
            partsOrdered: false,
            partsReceived: false,
        },
    })

    for (const product of products) {
        const { id: productId, ...restProduct } = product
        await prisma.salesOrderProduct.update({
            where: { id: productId },
            data: { ...restProduct },
        })
    }

    for (const assembledProduct of assembledProducts) {
        await prisma.salesOrderAssembledProduct.delete({
            where: { id: assembledProduct.id },
        })
    }

    for (const newAssembledProduct of newAssembledProducts) {
        await prisma.salesOrderAssembledProduct.create({
            data: {
                item: newAssembledProduct.item,
                allAssembled: newAssembledProduct.allAssembled,
                salesOrder: {
                    connect: {
                        id: salesOrderId,
                    },
                },
            },
        })
    }

    return Response.json({ data })
}
