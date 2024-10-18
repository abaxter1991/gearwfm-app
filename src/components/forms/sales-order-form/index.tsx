import { CalendarDate, CalendarDateTime, ZonedDateTime, getLocalTimeZone, now } from '@internationalized/date'
import { z } from 'zod'
import { SalesOrderForm } from './sales-order-form'
import type { SalesOrderFormData, SalesOrderProductFormData } from '~/types'

const today = now(getLocalTimeZone())

const isDateValid = (value: any) => [CalendarDate, CalendarDateTime, ZonedDateTime].some(type => value instanceof type)
const isDateValidOrEmpty = (value: any) => value === '' || isDateValid(value)

export { SalesOrderForm }

export const salesOrderFormSchema = z.object({
    id: z.string(),
    orderDate: z.any().refine(isDateValidOrEmpty, ''),
    dueDate: z.any().refine(isDateValidOrEmpty, ''),
    salesRepName: z.string().trim().min(1, ''),
    salesRepEmailAddress: z.string().trim().email('').or(z.literal('')),
    externalId: z.string().trim(),
    referenceId: z.string().trim(),
    isNewCustomer: z.boolean(),
    companyName: z.string().trim().min(1, ''),
    contactName: z.string().trim(),
    phoneNumber: z.string().trim().regex(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, '').or(z.literal('')),
    emailAddress: z.string().trim().email('').or(z.literal('')),
    shippingAddress: z.string().trim(),
    billingAddress: z.string().trim(),
    notes: z.string().trim(),
    trackingNumber: z.string().trim(),
    discount: z.number().nonnegative(''),
    shippingPrice: z.number().nonnegative(''),
    grandTotal: z.number().nonnegative(''),
    products: z.array(
        z.object({
            id: z.string(),
            item: z.string(),
            fileName: z.string().trim(),
            style: z.string().trim(),
            color: z.string().trim(),
            mockupImageUrl: z.string().trim(),
            notes: z.string().trim(),
            quantityOfXS: z.number().nonnegative(''),
            quantityOfSM: z.number().nonnegative(''),
            quantityOfMD: z.number().nonnegative(''),
            quantityOfLG: z.number().nonnegative(''),
            quantityOfXL: z.number().nonnegative(''),
            quantityOf2XL: z.number().nonnegative(''),
            quantityOf3XL: z.number().nonnegative(''),
            quantityOf4XL: z.number().nonnegative(''),
            totalQuantity: z.number().nonnegative(''),
            unitPrice: z.number().nonnegative(''),
            subtotal: z.number().nonnegative(''),
        }),
    ),
    assembledProducts: z.array(
        z.object({
            id: z.string(),
            item: z.string(),
            allAssembled: z.boolean(),
        }),
    ),
})

export type SalesOrderFormSchema = z.infer<typeof salesOrderFormSchema>

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
