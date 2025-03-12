import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'
import type { NextRequest } from 'next/server'

type Props = {
    params: Promise<{
        productId: string
    }>
}

export async function GET(request: NextRequest, props: Props) {
    const params = await props.params;
    const { productId } = params

    const product = await prisma.salesOrderProduct.findUnique({
        where: {
            id: productId,
        },
    })

    return NextResponse.json(product, { status: 200 })
}

export async function DELETE(request: NextRequest, props: Props) {
    const params = await props.params;
    const { productId } = params

    await prisma.salesOrderProduct.delete({
        where: {
            id: productId,
        },
    })

    return NextResponse.json({ success: true }, { status: 200 })
}
