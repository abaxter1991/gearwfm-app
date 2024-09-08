// import { Card, CardBody } from '@nextui-org/react'
import { SalesOrderCard } from '~/components/sales-order/sales-order-card'
// import { SearchBar } from '~/components/ui/custom/search-bar'
import prisma from '~/prisma/client'

export const dynamic = 'force-dynamic'

export default async function SalesOrdersPage() {
    const salesOrders = await prisma.salesOrder.findMany({
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
        orderBy: {
            createdAt: 'asc',
        },
    })

    const _salesOrdersV2 = await prisma.salesOrder.findMany({
        where: {
            OR: [
                {
                    companyName: {
                        contains: 'test',
                    },
                },
            ],
        },
    })

    return (
        <div className="flex w-full flex-col items-center gap-4">
            {/*<Card className="w-full">*/}
            {/*    <CardBody>*/}
            {/*        <SearchBar />*/}
            {/*    </CardBody>*/}
            {/*</Card>*/}
            <div className="grid grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
                {salesOrders.map((salesOrder) => (
                    <SalesOrderCard
                        key={salesOrder.id}
                        salesOrderId={salesOrder.id}
                    />
                ))}
            </div>
        </div>
    )
}
