import PaginationBar from '~/components/common/pagination-bar'
import { SalesOrderCard } from '~/components/sales-order/sales-order-card'
import { AwaitingPaymentChip } from '~/components/ui/custom/awaiting-payment-chip'
import { FilterModal } from '~/components/ui/custom/filter-modal'
import { ResetSearchParamsButton } from '~/components/ui/custom/reset-search-params-button'
import { SearchBar } from '~/components/ui/custom/search-bar'
import { StatusTabs } from '~/components/ui/custom/status-tabs'
import prisma from '~/prisma/client'
import type { Prisma, SalesOrderStatus } from '@prisma/client'

export const dynamic = 'force-dynamic'

type Props = {
    searchParams: Promise<{
        page?: string
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
    }>
}

export default async function SalesOrdersPage(props: Props) {
    const searchParams = await props.searchParams

    const {
        page,
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

    const defaultSalesOrderStatus: Prisma.EnumSalesOrderStatusFilter = { notIn: ['QUOTE', 'COMPLETED'] }
    const salesOrderStatus = (!status || status === 'all') ? defaultSalesOrderStatus : status?.toUpperCase() as SalesOrderStatus | Prisma.EnumSalesOrderStatusFilter
    const searchOptions: Prisma.StringFilter<"SalesOrder"> | string = { contains: search ? search : '', mode: 'insensitive' }
    const productSearchOptions: Prisma.StringFilter<"SalesOrderProduct"> | string = { contains: search ? search : '', mode: 'insensitive' }
    const sortDateByOption = sortDateBy ? sortDateBy : 'desc'

    let dateRangeParams = {}
    let orderByParams = {}

    if (startDate && endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)

        const startUTCDate = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
        const endUTCDate = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())

        // TODO: startUTCDate and endUTCDate is a dumb way to manipulate the UTC offset to match the format of the dates stored in the database.
        //       If these dates aren't manipulated in this way, then when searching for an order on the same day that it was created, you won't
        //       be able to find it unless you change the end date in the date range component to 1 or more days in the future.
        //       Instead of manipulating the data here, figure out how to store the dates in the database with a time of 0.
        //       For example: 2025-01-01T00:00:00.000Z
        //       A date formatted like this example is what should be passed into prismas create / update functions using the orderDate and dueDate
        //       variables in the new-sales-order/route.ts and update-sales-order/route.ts API route files. This will eliminate the issue mentioned
        //       above and this dumb manipulation of the start and end dates can be removed from this file.

        if (searchDateBy == 'orderDate') {
            dateRangeParams = { orderDate: { gte: startUTCDate, lte: endUTCDate } }
            orderByParams = { orderDate: sortDateByOption }
        } else if (searchDateBy == 'dueDate') {
            dateRangeParams = { dueDate: { gte: startUTCDate, lte: endUTCDate } }
            orderByParams = { dueDate: sortDateByOption }
        }
    } else {
        orderByParams = { createdAt: sortDateByOption }
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

    const currentPage = page ? Number(page) : 1
    const limitPerPage = 24

    const whereInput: Prisma.SalesOrderWhereInput = {
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
    }

    const salesOrders = await prisma.salesOrder.findMany({
        take: limitPerPage,
        skip: limitPerPage * (currentPage - 1),
        where: whereInput,
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
        orderBy: orderByParams,
    })

    const totalSalesOrders = await prisma.salesOrder.count({ where: whereInput })

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                    <StatusTabs />
                    <FilterModal />
                    <ResetSearchParamsButton />
                </div>
                <AwaitingPaymentChip />
            </div>
            <SearchBar />
            <div className="grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
                {salesOrders.map((salesOrder) => (
                    <SalesOrderCard
                        key={salesOrder.id}
                        salesOrder={salesOrder}
                    />
                ))}
            </div>
            <div className="flex justify-center">
                <PaginationBar totalPages={Math.ceil(totalSalesOrders / limitPerPage)} />
            </div>
        </div>
    )
}
