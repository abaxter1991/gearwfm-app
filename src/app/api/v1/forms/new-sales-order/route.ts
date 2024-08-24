import prisma from '@/prisma/client'
import type { SalesOrder } from '@/components/forms/new-sales-order'

export async function POST(request: Request) {
    const data: SalesOrder = await request.json()
    const { isNewCustomer, orderDate, dueDate, products, ...salesOrder } = data
    const productsToAssemble: string[] = []

    products.forEach((product) => {
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
            orderDate: new Date(orderDate.year, orderDate.month, orderDate.day),
            dueDate: new Date(dueDate.year, dueDate.month, dueDate.day),
            status: 'NEW_ORDER',
            isDraft: true,
            approvedProof: false,
            partsOrdered: false,
            partsReceived: false,
            products: { create: products },
            assembledProducts: { create: assembledProducts },
        },
    })

    return Response.json({ data })
}
