import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'
import type { SalesOrderFormData } from '~/types'

export async function POST(request: Request) {
    try {
        const salesOrder: SalesOrderFormData = await request.json()
        const { id: _salesOrderId, isNewCustomer, orderDate, dueDate, products, ...restSalesOrder } = salesOrder
        const productsToAssemble: string[] = []

        products.forEach((product) => {
            if (product.item && !productsToAssemble.includes(product.item)) {
                productsToAssemble.push(product.item)
            }
        })

        const cleanedProducts = products.map((product) => {
            const { id: _productId, ...restProduct } = product
            return restProduct
        })

        const assembledProducts = productsToAssemble.map((item) => {
            return { item, allAssembled: false }
        })

        await prisma.salesOrder.create({
            data: {
                ...restSalesOrder,
                isNewCustomer: Boolean(isNewCustomer),
                orderDate: new Date(orderDate.year, orderDate.month - 1, orderDate.day),
                dueDate: new Date(dueDate.year, dueDate.month - 1, dueDate.day),
                status: 'DRAFT',
                isDraft: true,
                approvedProof: false,
                partsOrdered: false,
                partsReceived: false,
                products: { create: cleanedProducts },
                assembledProducts: { create: assembledProducts },
            },
        })

        return NextResponse.json({ salesOrder }, { status: 200 })
    } catch (error) {
        console.error('Failed to create sales order:', error)
        return NextResponse.json({ error, message: 'Internal Server Error' }, { status: 500 })
    }
}
