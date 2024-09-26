import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'
import type { NextRequest } from 'next/server'

type Params = {
    params: {
        salesOrderId: string
    }
}

export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const { salesOrderId } = params
        const { status } = await request.json()

        const salesOrder = await prisma.salesOrder.update({
            where: { id: salesOrderId },
            data: { status: status },
        })

        return NextResponse.json({ data: salesOrder })
    } catch (error) {
        console.error('Failed to update sales order:', error)
        return NextResponse.json({ error, message: 'Internal Server Error' }, { status: 500 })
    }
}
