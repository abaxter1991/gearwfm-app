import type { DateValue } from '@internationalized/date'
import type { SalesOrder, SalesOrderAssembledProduct, SalesOrderProduct } from '@prisma/client'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}

export type SalesOrderFormData = {
    id: string
    orderDate: DateValue
    dueDate: DateValue
    salesRepName: string
    salesRepEmailAddress: string
    externalId: string
    referenceId: string
    isNewCustomer: boolean
    companyName: string
    contactName: string
    phoneNumber: string
    emailAddress: string
    shippingAddress: string
    billingAddress: string
    notes: string
    trackingNumber: string
    discount: number
    shippingPrice: number
    grandTotal: number
    products: SalesOrderProductFormData[]
    assembledProducts: SalesOrderAssembledProductFormData[]
}

export type SalesOrderProductFormData = {
    id: string
    item: string
    fileName: string
    style: string
    color: string
    mockupImageUrl: string
    notes: string
    quantityOfXS: number
    quantityOfSM: number
    quantityOfMD: number
    quantityOfLG: number
    quantityOfXL: number
    quantityOf2XL: number
    quantityOf3XL: number
    quantityOf4XL: number
    totalQuantity: number
    unitPrice: number
    subtotal: number
}

export type SalesOrderAssembledProductFormData = {
    id: string
    item: string
    allAssembled: boolean
}
