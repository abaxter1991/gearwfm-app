import prisma from '~/prisma/client'
import type { SalesOrderType } from '~/components/forms/sales-order-form'

export async function POST(request: Request) {
    const data: SalesOrderType = await request.json()

    const { id: salesOrderId, isNewCustomer, orderDate, dueDate, products, assembledProducts, ...salesOrder } = data

    const productsToAssemble: string[] = []

    products.forEach((product) => {
        if (product.item && !productsToAssemble.includes(product.item)) {
            productsToAssemble.push(product.item)
        }
    })

    function isAllAssembled(item: string) {
        const assembledProduct = assembledProducts.find((product) => product.item === item)

        if (!assembledProduct || !assembledProduct.allAssembled) {
            return false
        }

        return assembledProduct.allAssembled
    }

    const newAssembledProducts = productsToAssemble.map((item) => {
        return {
            item,
            allAssembled: isAllAssembled(item),
        }
    })

    await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            ...salesOrder,
            isNewCustomer: Boolean(isNewCustomer),
            orderDate: new Date(orderDate.year, orderDate.month - 1, orderDate.day),
            dueDate: new Date(dueDate.year, dueDate.month - 1, dueDate.day),
            status: 'NEW_ORDER',
            isDraft: true,
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
