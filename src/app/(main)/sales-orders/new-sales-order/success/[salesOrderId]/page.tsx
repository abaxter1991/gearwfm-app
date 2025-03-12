import { SalesOrderSubmittedSuccessfully } from 'src/components/forms/sales-order-form/sales-order-submitted-successfully'

type Props = {
    params: Promise<{
        salesOrderId: string
    }>
}

export default async function SalesOrderSubmittedSuccessfullyPage(props: Props) {
    const params = await props.params;
    const { salesOrderId } = params

    return <SalesOrderSubmittedSuccessfully salesOrderId={salesOrderId} />
}
