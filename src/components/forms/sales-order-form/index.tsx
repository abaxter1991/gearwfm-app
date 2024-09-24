import { getLocalTimeZone, now } from '@internationalized/date'
import { SalesOrderForm } from './sales-order-form'
import type { SalesOrderFormData, SalesOrderProductFormData } from '~/types'

const today = now(getLocalTimeZone())

export { SalesOrderForm }

export const mitchellsSalesOrder: SalesOrderFormData = {
    id: '',
    orderDate: today,
    dueDate: today.add({ weeks: 3 }),
    salesRepName: 'Shawn Baxter',
    salesRepEmailAddress: 'shawn@baxbo.com',
    externalId: '',
    referenceId: '',
    isNewCustomer: false,
    companyName: 'Techfall - ',
    contactName: 'Mitchell Kay',
    phoneNumber: '',
    emailAddress: 'mitchelldkay@gmail.com',
    shippingAddress: '2548 W Townhouse Dr.  Mapleton, UT 84664',
    billingAddress: '',
    notes: '',
    trackingNumber: '',
    discount: 0,
    shippingPrice: 0.0,
    grandTotal: 0.0,
    products: [],
    assembledProducts: [],
}

export const defaultSalesOrder: SalesOrderFormData = {
    id: '',
    orderDate: today,
    dueDate: today.add({ weeks: 3 }),
    salesRepName: '',
    salesRepEmailAddress: '',
    externalId: '',
    referenceId: '',
    isNewCustomer: false,
    companyName: '',
    contactName: '',
    phoneNumber: '',
    emailAddress: '',
    shippingAddress: '',
    billingAddress: '',
    notes: '',
    trackingNumber: '',
    discount: 0,
    shippingPrice: 0.0,
    grandTotal: 0.0,
    products: [],
    assembledProducts: [],
}

export const defaultSalesOrderProduct: SalesOrderProductFormData = {
    id: '',
    item: '',
    fileName: '',
    style: '',
    color: '',
    mockupImageUrl: '',
    notes: '',
    quantityOfXS: 0,
    quantityOfSM: 0,
    quantityOfMD: 0,
    quantityOfLG: 0,
    quantityOfXL: 0,
    quantityOf2XL: 0,
    quantityOf3XL: 0,
    quantityOf4XL: 0,
    totalQuantity: 0,
    unitPrice: 0.0,
    subtotal: 0.0,
}
