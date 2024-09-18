import { SalesOrderForm } from '~/components/forms/sales-order-form'

type Props = {
    params: {
        salesOrderId: string
    }
}

export default async function SalesOrderPage({ params }: Props) {
    const { salesOrderId } = params

    return (
        <SalesOrderForm salesOrderId={salesOrderId} />
    )
}
