import { SalesOrderCard } from '~/components/sales-order/sales-order-card'
import { FilterModal } from '~/components/ui/custom/filter-modal'
import { SearchBar } from '~/components/ui/custom/search-bar'
import { StatusTabs } from '~/components/ui/custom/status-tabs'
import prisma from '~/prisma/client'
import type { Prisma, SalesOrderStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

type Props = {
    searchParams: {
        status?: string
        startDate?: string
        endDate?: string
        searchDateBy?: string
        search?: string
    }
}

export default async function SalesOrdersPage({ searchParams }: Props) {
    const { status, startDate, endDate, searchDateBy, search } = searchParams

    const salesOrderStatus = status === 'all' ? undefined : status?.toUpperCase() as SalesOrderStatus | undefined
    const searchOptions: Prisma.StringFilter<"SalesOrder"> | string = { contains: search ? search : '', mode: 'insensitive' }

    let dateRangeParams = {}

    if (startDate && endDate) {
        if (searchDateBy == 'orderDate') {
            dateRangeParams = { orderDate: { gte: new Date(startDate), lte: new Date(endDate) } }
        } else if (searchDateBy == 'dueDate') {
            dateRangeParams = { dueDate: { gte: new Date(startDate), lte: new Date(endDate) } }
        }
    }

    const salesOrders = await prisma.salesOrder.findMany({
        where: {
            ...dateRangeParams,
            status: salesOrderStatus,
            isArchived: false,
            OR: [
                { id: searchOptions },
                { referenceId: searchOptions },
                { salesRepName: searchOptions },
                { salesRepEmailAddress: searchOptions },
                { customerServiceRepName: searchOptions },
                { companyName: searchOptions },
                { contactName: searchOptions },
                { phoneNumber: searchOptions },
                { emailAddress: searchOptions },
                { shippingAddress: searchOptions },
                { billingAddress: searchOptions },
                { notes: searchOptions },
                { trackingNumber: searchOptions },
            ],
        },
        include: {
            products: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            assembledProducts: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-4">
                <StatusTabs />
                <FilterModal />
            </div>
            <SearchBar />
            <div className="grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
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
