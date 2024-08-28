import { SalesOrderAndRelations } from '@/types'
import useSWR from 'swr'

export function useSalesOrder(salesOrderId: string) {
    return useSWR<SalesOrderAndRelations>(`/sales-order/${salesOrderId}`)
}
