import { UTApi } from 'uploadthing/server'
import prisma from '@/prisma/client'
import type { SalesOrder } from '@/components/forms/new-sales-order'

export async function POST(request: Request) {
    const data: SalesOrder = await request.json()

    const { orderDate, dueDate, products, ...salesOrder } = data

    const createdSalesOrder = await prisma.salesOrder.create({
        data: {
            ...salesOrder,
            orderDate: new Date(orderDate.year, orderDate.month, orderDate.day),
            dueDate: new Date(dueDate.year, dueDate.month, dueDate.day),
            status: 'NEW_ORDER',
            isDraft: true,
            products: { create: products },
        },
    })

    // const utApi = new UTApi()
    //
    // for (const item of products) {
    //     const { mockupImageBlob, ...product } = item
    //
    //     console.dir({ mockupImageBlob })
    //
    //     const createdProduct = await prisma.salesOrderProduct.create({
    //         data: {
    //             ...product,
    //             salesOrderId: createdSalesOrder.id,
    //         },
    //     })
    //
    //     try {
    //         if (mockupImageBlob) {
    //             const file = {
    //                 ...mockupImageBlob,
    //                 name: '',
    //             }
    //
    //             console.dir({ file })
    //
    //             const utResponse = await utApi.uploadFiles(file)
    //
    //             console.dir({ utResponse })
    //
    //             if (utResponse.data) {
    //                 await prisma.salesOrderProduct.update({
    //                     where: {
    //                         id: createdProduct.id,
    //                     },
    //                     data: {
    //                         mockupImageUrl: utResponse.data.url
    //                     }
    //                 })
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    return Response.json({ data })
}
