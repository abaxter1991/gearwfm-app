import useSWR from 'swr'
import { type SalesOrderAndRelations } from '~/types'

export function useSalesOrder(salesOrderId: string) {
    return useSWR<SalesOrderAndRelations>(`/sales-order/${salesOrderId}`)
}
