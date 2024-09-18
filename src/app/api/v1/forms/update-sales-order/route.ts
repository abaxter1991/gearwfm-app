import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'
import type { SalesOrderFormData } from '~/types'

export async function POST(request: Request) {
    try {
        const salesOrder: SalesOrderFormData = await request.json()
        const { id: salesOrderId, orderDate, dueDate, isNewCustomer, products, assembledProducts, ...restSalesOrder } = salesOrder
        const productsToAssemble: string[] = []

        products.forEach((product) => {
            if (product.item && !productsToAssemble.includes(product.item)) {
                productsToAssemble.push(product.item)
            }
        })

        const isAllAssembled = (item: string) => {
            const assembledProduct = assembledProducts.find((product) => product.item === item)
            return assembledProduct?.allAssembled || false
        }

        const newAssembledProducts = productsToAssemble.map((item) => {
            return { item, allAssembled: isAllAssembled(item) }
        })

        await prisma.salesOrder.update({
            where: { id: salesOrderId },
            data: {
                ...restSalesOrder,
                isNewCustomer: Boolean(isNewCustomer),
                orderDate: new Date(orderDate.year, orderDate.month - 1, orderDate.day),
                dueDate: new Date(dueDate.year, dueDate.month - 1, dueDate.day),
                status: 'NEW_ORDER',
                isDraft: true,
            },
        })

        await Promise.all(products.map(async (product) => {
            const { id: productId, ...restProduct } = product

            await prisma.salesOrderProduct.upsert({
                where: { id: productId },
                update: { ...restProduct },
                create: {
                    ...restProduct,
                    salesOrder: {
                        connect: {
                            id: salesOrderId,
                        },
                    },
                },
            })
        }))

        await Promise.all(assembledProducts.map(async (assembledProduct) => {
            await prisma.salesOrderAssembledProduct.delete({
                where: { id: assembledProduct.id },
            })
        }))

        await Promise.all(newAssembledProducts.map(async (newAssembledProduct) => {
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
        }))

        return NextResponse.json({ data: salesOrder })
    } catch (error) {
        console.error('Failed to update sales order:', error)
        return NextResponse.json({ error, message: 'Internal Server Error' }, { status: 500 })
    }
}
