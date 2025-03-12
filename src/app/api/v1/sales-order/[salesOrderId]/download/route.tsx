import { renderToStream } from '@react-pdf/renderer'
import { NextResponse } from 'next/server'
import { DownloadableSalesOrder } from '~/components/sales-order/downloadable-sales-order'
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
        where: { id: salesOrderId },
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

    if (!salesOrder) {
        return NextResponse.json({ error: 'Not Found', message: `Error: Could not find sales order ${salesOrderId}` }, { status: 404 })
    }

    const stream = await renderToStream(<DownloadableSalesOrder salesOrder={salesOrder} />) as unknown as ReadableStream

    return new NextResponse(stream)
}
