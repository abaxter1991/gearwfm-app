import type { SalesOrder, SalesOrderProduct, SalesOrderAssembledProduct } from '@prisma/client'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}
