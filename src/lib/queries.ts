import useSWRImmutable from 'swr/immutable'
import type { SalesOrderProduct } from '@prisma/client'
import type { SalesOrderAndRelations } from '~/types'

export function useSalesOrder(salesOrderId: string | null | undefined) {
    return useSWRImmutable<SalesOrderAndRelations>(`/sales-order/${salesOrderId}`)
}

export function useSalesOrderProduct(productId: string | null | undefined) {
    return useSWRImmutable<SalesOrderProduct>(`/product/${productId}`)
}
