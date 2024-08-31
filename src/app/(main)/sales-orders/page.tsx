import prisma from '@/prisma/client'
import { SalesOrderCard } from '@/components/sales-order/sales-order-card'

export const dynamic = 'force-dynamic'

export default async function SalesOrdersPage() {
    const salesOrders = await prisma.salesOrder.findMany({
        include: {
            products: {
                orderBy: {
                    item: 'asc',
                }
            },
            assembledProducts: {
                orderBy: {
                    item: 'asc',
                }
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    })

    return (
        <div className="flex w-full justify-center">
            <div className="grid grid-cols-3 gap-8 place-items-stretch">
                {salesOrders.map((salesOrder) => (
                    <SalesOrderCard key={salesOrder.id} salesOrderId={salesOrder.id} />
                ))}
            </div>
        </div>
    )
}
