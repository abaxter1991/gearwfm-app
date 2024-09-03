'use client'

import { SalesOrderForm } from '@/components/forms/sales-order-form'
import { useSalesOrder } from '@/lib/queries'

type Props = {
    params: {
        salesOrderId: string
    }
}

export default function SalesOrdersPage({ params }: Props) {
    const { salesOrderId } = params

    const { data: salesOrder, mutate } = useSalesOrder(salesOrderId)

    return (
        <SalesOrderForm salesOrder={salesOrder} mutate={mutate} />
    )
}
