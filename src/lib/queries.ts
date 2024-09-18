import useSWR from 'swr'
import { type SalesOrderAndRelations } from '~/types'

export function useSalesOrder(salesOrderId: string | null | undefined) {
    return useSWR<SalesOrderAndRelations>(`/sales-order/${salesOrderId}`)
}
