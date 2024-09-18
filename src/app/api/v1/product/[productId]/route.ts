import { NextResponse } from 'next/server'
import prisma from '~/prisma/client'
import type { NextRequest } from 'next/server'

type Params = {
    params: {
        productId: string
    }
}

export async function DELETE(request: NextRequest, { params }: Params) {
    const { productId } = params

    await prisma.salesOrderProduct.delete({
        where: {
            id: productId,
        },
    })

    return NextResponse.json({ success: true }, { status: 200 })
}
