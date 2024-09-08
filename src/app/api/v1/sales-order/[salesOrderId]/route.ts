import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'
import type { NextRequest } from 'next/server'

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
            products: {
                orderBy: {
                    item: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    item: 'asc',
                },
            },
        },
    })

    return NextResponse.json(salesOrder, { status: 200 })
}
