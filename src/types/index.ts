import type { DateValue } from '@internationalized/date'
import type { SalesOrder, SalesOrderAssembledProduct, SalesOrderProduct } from '@prisma/client'

export type PartSize = 'XS' | 'SM' | 'MD' | 'LG' | 'XL' | '2XL' | '3XL' | '4XL'
export type ProductQuantityFieldName = 'quantityOfXS' | 'quantityOfSM' | 'quantityOfMD' | 'quantityOfLG' | 'quantityOfXL' | 'quantityOf2XL' | 'quantityOf3XL' | 'quantityOf4XL'
export type ProductReceivedFieldName = 'receivedXS' | 'receivedSM' | 'receivedMD' | 'receivedLG' | 'receivedXL' | 'received2XL' | 'received3XL' | 'received4XL'

export type PusherTriggerDataForProductReceived = {
    salesOrderId: string
    productId: string
    receivedFieldName: ProductReceivedFieldName
    received: boolean
}

export type SizeField = {
    label: PartSize
    name: ProductQuantityFieldName
    receivedFieldName: ProductReceivedFieldName
    show?: boolean
}

export type SizeFields = {
    XS: SizeField
    SM: SizeField
    MD: SizeField
    LG: SizeField
    XL: SizeField
    XL2: SizeField
    XL3: SizeField
    XL4: SizeField
}

export type ProductCategory = {
    key: string
    label: string
    group: string
    sizeFields: SizeFields
}

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
    receivedXS: boolean
    receivedSM: boolean
    receivedMD: boolean
    receivedLG: boolean
    receivedXL: boolean
    received2XL: boolean
    received3XL: boolean
    received4XL: boolean
    printedXS: boolean
    printedSM: boolean
    printedMD: boolean
    printedLG: boolean
    printedXL: boolean
    printed2XL: boolean
    printed3XL: boolean
    printed4XL: boolean
    countedXS: boolean
    countedSM: boolean
    countedMD: boolean
    countedLG: boolean
    countedXL: boolean
    counted2XL: boolean
    counted3XL: boolean
    counted4XL: boolean
}

export type SalesOrderAssembledProductFormData = {
    id: string
    item: string
    allAssembled: boolean
}
