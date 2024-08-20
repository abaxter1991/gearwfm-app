import prisma from '@/prisma/client'
import type { SalesOrder } from '@/components/forms/new-sales-order'

export async function POST(request: Request) {
    const data: SalesOrder = await request.json()

    const { orderDate, dueDate, products, ...salesOrder } = data

    await prisma.salesOrder.create({
        data: {
            ...salesOrder,
            orderDate: new Date(orderDate.year, orderDate.month, orderDate.day),
            dueDate: new Date(dueDate.year, dueDate.month, dueDate.day),
            status: 'NEW_ORDER',
            isDraft: true,
            products: { create: products },
        },
    })

    return Response.json({ data })
}
