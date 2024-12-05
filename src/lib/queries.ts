import useSWR from 'swr'
import type { SalesOrderProduct } from '@prisma/client'
import type { SalesOrderAndRelations } from '~/types'

export function useSalesOrder(salesOrderId: string | null | undefined) {
    return useSWR<SalesOrderAndRelations>(`/sales-order/${salesOrderId}`)
}

export function useSalesOrderProduct(productId: string | null | undefined) {
    return useSWR<SalesOrderProduct>(`/product/${productId}`)
}
