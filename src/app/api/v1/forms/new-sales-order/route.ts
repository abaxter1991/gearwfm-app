import prisma from '@/prisma/client'
import type { SalesOrderType } from '@/components/forms/sales-order-form'

export async function POST(request: Request) {
    const data: SalesOrderType = await request.json()
    const { id, isNewCustomer, orderDate, dueDate, products, ...salesOrder } = data
    const productsToAssemble: string[] = []

    const cleanedProducts = products.map((product) => {
        const { id, ...restProduct } = product
        return restProduct
    })

    cleanedProducts.forEach((product) => {
        if (product.item && !productsToAssemble.includes(product.item)) {
            productsToAssemble.push(product.item)
        }
    })

    const assembledProducts = productsToAssemble.map((item) => {
        return { item, allAssembled: false }
    })

    const createdSalesOrder = await prisma.salesOrder.create({
        data: {
            ...salesOrder,
            isNewCustomer: Boolean(isNewCustomer),
            orderDate: new Date(orderDate.year, orderDate.month - 1, orderDate.day),
            dueDate: new Date(dueDate.year, dueDate.month - 1, dueDate.day),
            status: 'NEW_ORDER',
            isDraft: true,
            approvedProof: false,
            partsOrdered: false,
            partsReceived: false,
            products: { create: cleanedProducts },
            assembledProducts: { create: assembledProducts },
        },
    })

    return Response.json({ data })
}
