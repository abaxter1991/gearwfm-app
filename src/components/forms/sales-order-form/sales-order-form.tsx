'use client'

import { CalendarDateTime } from '@internationalized/date'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Form } from '~/components/ui/form'
import { useSalesOrder } from '~/lib/queries'
import { ActionButtons } from './action-buttons'
import { ProductList } from './product-list'
import { SalesOrderDetails } from './sales-order-details'
import { SalesOrderSummary } from './sales-order-summary'
import { defaultSalesOrder } from './index'
import type { SalesOrderFormData } from '~/types'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type Props = {
    salesOrderId?: string
    showImportButton?: boolean
}

export function SalesOrderForm({ salesOrderId, showImportButton = false }: Props) {
    const { data: salesOrder, mutate } = useSalesOrder(salesOrderId)

    const form = useForm<SalesOrderFormData>({ defaultValues: defaultSalesOrder })

    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (salesOrder) {
            const { products } = salesOrder
            const orderDate = new Date(salesOrder.orderDate)
            const dueDate = new Date(salesOrder.dueDate)
            const formattedOrderDate = new CalendarDateTime(orderDate.getUTCFullYear(), orderDate.getUTCMonth() + 1, orderDate.getUTCDate())
            const formattedDueDate = new CalendarDateTime(dueDate.getUTCFullYear(), dueDate.getUTCMonth() + 1, dueDate.getUTCDate())

            const cleanedProducts = products.map((product) => {
                const { salesOrderId: _salesOrderId, ...restProduct } = product
                return restProduct
            })

            form.setValue('id', salesOrder.id)
            form.setValue('orderDate', formattedOrderDate)
            form.setValue('dueDate', formattedDueDate)
            form.setValue('salesRepName', salesOrder.salesRepName)
            form.setValue('salesRepEmailAddress', salesOrder.salesRepEmailAddress)
            form.setValue('externalId', salesOrder.externalId)
            form.setValue('referenceId', salesOrder.referenceId)
            form.setValue('isNewCustomer', salesOrder.isNewCustomer)
            form.setValue('companyName', salesOrder.companyName)
            form.setValue('contactName', salesOrder.contactName)
            form.setValue('phoneNumber', salesOrder.phoneNumber)
            form.setValue('emailAddress', salesOrder.emailAddress)
            form.setValue('shippingAddress', salesOrder.shippingAddress)
            form.setValue('billingAddress', salesOrder.billingAddress)
            form.setValue('notes', salesOrder.notes)
            form.setValue('trackingNumber', salesOrder.trackingNumber)
            form.setValue('discount', salesOrder.discount)
            form.setValue('shippingPrice', salesOrder.shippingPrice)
            form.setValue('grandTotal', salesOrder.grandTotal)
            form.setValue('products', cleanedProducts)
        }
    }, [salesOrder])

    const onSubmit = form.handleSubmit(async (data) => {
        setIsSubmitting(true)

        if (salesOrder) {
            const response = await axios.post(`${apiBaseUrl}/forms/update-sales-order`, data)
            const errorMessage = response.data.message

            if (errorMessage) {
                toast(`Oops, something went wrong! ${errorMessage}`)
                setIsSubmitting(false)
                return
            }

            mutate()
            handleFormResetAndClose()
            toast('Sales order has been updated!')
        } else {
            const response = await axios.post(`${apiBaseUrl}/forms/new-sales-order`, data)
            const errorMessage = response.data.message

            if (errorMessage) {
                toast(`Oops, something went wrong! ${errorMessage}`)
                setIsSubmitting(false)
                return
            }

            form.reset()
            toast('New sales order has been submitted!')
        }
    })

    function handleFormResetAndClose() {
        form.reset()
        router.push('/sales-orders')
        setIsSubmitting(false)
    }

    function updateTotalQuantity(productIndex: number) {
        const formValues = form.getValues()
        const product = formValues.products[productIndex]

        if (product) {
            const { quantityOfXS, quantityOfSM, quantityOfMD, quantityOfLG, quantityOfXL, quantityOf2XL, quantityOf3XL, quantityOf4XL } = product
            const totalQuantity = Number(quantityOfXS) + Number(quantityOfSM) + Number(quantityOfMD) + Number(quantityOfLG) + Number(quantityOfXL) + Number(quantityOf2XL) + Number(quantityOf3XL) + Number(quantityOf4XL)
            form.setValue(`products.${productIndex}.totalQuantity`, totalQuantity)
        }
    }

    function updateSubTotal(productIndex: number) {
        const formValues = form.getValues()
        const product = formValues.products[productIndex]

        if (product) {
            const { totalQuantity, unitPrice } = product
            const subtotal = Number(totalQuantity) * Number(unitPrice)
            form.setValue(`products.${productIndex}.subtotal`, subtotal)
        }
    }

    function updateGrandTotal() {
        const formValues = form.getValues()
        const { discount, shippingPrice, products } = formValues
        const subtotalSum = products.reduce((total, product) => total + product.subtotal, 0)
        const discountAmount = subtotalSum * (discount / 100)
        const grandTotal = subtotalSum - discountAmount + Number(shippingPrice)
        form.setValue('grandTotal', grandTotal)
    }

    useEffect(() => {
        const subscription = form.watch((value, { name, type }) => {
            if (name) {
                // Update value of the grandTotal field when the discount or shippingPrice field has been updated.
                if (name.includes('discount') || name.includes('shippingPrice')) {
                    updateGrandTotal()
                }

                // Update fields in each product
                if (name.startsWith('products')) {
                    const productIndex = name.split('.')[1]

                    // Update value of the totalQuantity, subtotal, and grandTotal fields when a size quantity field has been updated.
                    if (name.includes('.quantityOf')) {
                        updateTotalQuantity(Number(productIndex))
                        updateSubTotal(Number(productIndex))
                        updateGrandTotal()
                    }

                    // Update value of the subtotal, and grandTotal fields when the totalQuantity field has been updated.
                    if (name.includes('totalQuantity')) {
                        updateSubTotal(Number(productIndex))
                        updateGrandTotal()
                    }

                    // Update value of the subtotal, and grandTotal fields when the unitPrice field has been updated.
                    if (name.includes('.unitPrice')) {
                        updateSubTotal(Number(productIndex))
                        updateGrandTotal()
                    }
                }
            }
        })

        return () => subscription.unsubscribe()
    }, [form.watch])

    return (
        <Form {...form}>
            <form>
                <div className="flex size-full flex-col gap-4">
                    <SalesOrderDetails
                        form={form}
                        salesOrder={salesOrder}
                        showImportButton={showImportButton}
                    />
                    <ProductList form={form} />
                    <SalesOrderSummary
                        form={form}
                        actionButtons={<ActionButtons
                            submitButtonLabel={salesOrder ? 'Save' : 'Submit'}
                            showCancelButton={!!salesOrder}
                            isDisabled={isSubmitting}
                            onCancel={handleFormResetAndClose}
                            onSave={onSubmit}
                        />}
                    />
                </div>
            </form>
        </Form>
    )
}