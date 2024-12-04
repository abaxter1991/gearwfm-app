import { SalesOrderCard } from '~/components/sales-order/sales-order-card'
import { FilterModal } from '~/components/ui/custom/filter-modal'
import { ResetSearchParamsButton } from '~/components/ui/custom/reset-search-params-button'
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
        sortDateBy?: 'asc' | 'desc'
        search?: string
        isNewCustomer?: string
        approvedProof?: string
        partsOrdered?: string
        partsReceived?: string
    }
}

export default async function SalesOrdersPage({ searchParams }: Props) {
    const {
        status,
        startDate,
        endDate,
        searchDateBy,
        sortDateBy,
        search,
        isNewCustomer,
        approvedProof,
        partsOrdered,
        partsReceived,
    } = searchParams

    const defaultsalesOrderStatus: Prisma.EnumSalesOrderStatusFilter = { not: 'COMPLETED' }
    const salesOrderStatus = status === 'all' ? defaultsalesOrderStatus : status?.toUpperCase() as SalesOrderStatus | Prisma.EnumSalesOrderStatusFilter
    const searchOptions: Prisma.StringFilter<"SalesOrder"> | string = { contains: search ? search : '', mode: 'insensitive' }
    const productSearchOptions: Prisma.StringFilter<"SalesOrderProduct"> | string = { contains: search ? search : '', mode: 'insensitive' }
    const sortDateByOption = sortDateBy ? sortDateBy : 'desc'

    let dateRangeParams = {}

    if (startDate && endDate) {
        if (searchDateBy == 'orderDate') {
            dateRangeParams = { orderDate: { gte: new Date(startDate), lte: new Date(endDate) } }
        } else if (searchDateBy == 'dueDate') {
            dateRangeParams = { dueDate: { gte: new Date(startDate), lte: new Date(endDate) } }
        }
    }

    function stringToBoolean(value: string | undefined): boolean | undefined {
        switch (value) {
            case 'true':
                return true
            case 'false':
                return false
            default:
                return undefined
        }
    }

    const salesOrders = await prisma.salesOrder.findMany({
        where: {
            ...dateRangeParams,
            status: salesOrderStatus,
            isArchived: false,
            isNewCustomer: stringToBoolean(isNewCustomer),
            approvedProof: stringToBoolean(approvedProof),
            partsOrdered: stringToBoolean(partsOrdered),
            partsReceived: stringToBoolean(partsReceived),
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
                { products: {
                    some: {
                        OR: [
                            { id: productSearchOptions },
                            { item: productSearchOptions },
                            { fileName: productSearchOptions },
                            { style: productSearchOptions },
                            { color: productSearchOptions },
                            { mockupImageUrl: productSearchOptions },
                            { notes: productSearchOptions },
                        ],
                    },
                }},
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
            createdAt: sortDateByOption,
        },
    })

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-4">
                <StatusTabs />
                <FilterModal />
                <ResetSearchParamsButton />
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
