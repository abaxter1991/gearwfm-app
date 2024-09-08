import type { SalesOrder, SalesOrderAssembledProduct, SalesOrderProduct } from '@prisma/client'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}
