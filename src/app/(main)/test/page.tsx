import { DownloadableSalesOrder } from '@/components/sales-order/downloadable-sales-order'
import prisma from '@/prisma/client'

export default async function SalesOrderTestPage() {
    const salesOrder = await prisma.salesOrder.findUnique({
        where: {
            id: 'cm088duxg0000i4hfwbpe74nb',
        },
        include: {
            products: true,
            assembledProducts: true,
        }
    })

    return (
        salesOrder && (
            <DownloadableSalesOrder salesOrder={salesOrder} />
        )
    )
}
