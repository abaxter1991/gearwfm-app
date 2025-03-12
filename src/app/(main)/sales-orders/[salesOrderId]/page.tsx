import { SalesOrderForm } from 'src/components/forms/sales-order-form'

type Props = {
    params: Promise<{
        salesOrderId: string
    }>
}

export default async function SalesOrderPage(props: Props) {
    const params = await props.params;
    const { salesOrderId } = params

    return (
        <SalesOrderForm salesOrderId={salesOrderId} />
    )
}
