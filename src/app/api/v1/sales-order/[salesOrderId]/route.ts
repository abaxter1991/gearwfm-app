import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'
import type { NextRequest } from 'next/server'

type Props = {
    params: Promise<{
        salesOrderId: string
    }>
}

export async function GET(request: NextRequest, props: Props) {
    const params = await props.params;
    const { salesOrderId } = params

    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: salesOrderId,
        },
        include: {
            products: {
                orderBy: {
                    id: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    id: 'asc',
                },
            },
        },
    })

    return NextResponse.json(salesOrder, { status: 200 })
}

export async function DELETE(request: NextRequest, props: Props) {
    const params = await props.params;
    const { salesOrderId } = params

    const salesOrder = await prisma.salesOrder.update({
        where: {
            id: salesOrderId,
        },
        data: {
            isArchived: true,
            archivedReason: 'User deleted sales order',
        }
    })

    return NextResponse.json(salesOrder, { status: 200 })
}
