import { SalesOrderSubmittedSuccessfully } from 'src/components/forms/sales-order-form/sales-order-submitted-successfully'

type Props = {
    params: {
        salesOrderId: string
    }
}

export default function PublicSalesOrderSubmittedSuccessfullyPage({ params }: Props) {
    const { salesOrderId } = params

    return <SalesOrderSubmittedSuccessfully salesOrderId={salesOrderId} />
}
