import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'

type Params = {
    params: {
        salesOrderId: string
    }
}

export async function GET(request: NextRequest, { params }: Params) {
    const salesOrderId = params.salesOrderId

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: true,
            assembledProducts: true,
        }
    })

    return NextResponse.json(salesOrder, { status: 200 })
}
