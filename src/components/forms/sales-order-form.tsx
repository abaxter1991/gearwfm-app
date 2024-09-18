'use client'

import { useUser } from '@clerk/nextjs'
import { CalendarDateTime, getLocalTimeZone, now } from '@internationalized/date'
import { Button, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { HiTrash } from 'react-icons/hi2'
import { toast } from 'sonner'
import { FileUpload } from '~/components/common/file-upload'
import { CheckboxField, DatePickerField, InputField, NumberInputField, TextAreaField } from '~/components/forms/fields'
import { SalesOrderImportModal } from '~/components/sales-order/sales-order-import-modal'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { productCategories } from '~/lib/constants/product-categories'
import { useSalesOrder } from '~/lib/queries'
import type { SalesOrderFormData, SalesOrderProductFormData } from '~/types'

// TODO: Fix the hydration error in react hook form devtools and implement a way to run devtools only on local dev server.
// import { DevTool } from '@hookform/devtools'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const today = now(getLocalTimeZone())

type Props = {
    salesOrderId?: string
    showImportButton?: boolean
}

export function SalesOrderForm({ salesOrderId, showImportButton = false }: Props) {
    const { data: salesOrder, mutate } = useSalesOrder(salesOrderId)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { user } = useUser()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    const defaultSalesOrder: SalesOrderFormData = {
        id: '',
        orderDate: today,
        dueDate: today.add({ weeks: 3 }),
        salesRepName: user?.fullName || '',
        salesRepEmailAddress: user?.primaryEmailAddress?.emailAddress || '',
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

    const defaultSalesOrderProduct: SalesOrderProductFormData = {
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

    const form = useForm<SalesOrderFormData>({ defaultValues: defaultSalesOrder })
    const { control, handleSubmit, formState, watch, reset } = form
    const { errors: _errors } = formState

    const {
        fields: products,
        append,
        remove,
    } = useFieldArray({
        name: 'products',
        control: control,
        keyName: 'rhfId'
    })

    const productsOutput = useWatch({
        name: 'products',
        control: control,
        defaultValue: products,
    })

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
    }, [user, salesOrder])

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)

        if (salesOrder) {
            const response = await axios.post(`${apiBaseUrl}/forms/update-sales-order`, data)
            const errorMessage = response.data.message

            if (errorMessage) {
                toast(`Oops, something went wrong! ${errorMessage}`)
                setIsLoading(false)
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
                setIsLoading(false)
                return
            }

            reset()
            toast('New sales order has been submitted!')
        }
    })

    function handleFormResetAndClose() {
        reset()
        router.push('/sales-orders')
        setIsLoading(false)
    }

    async function handleRemoveProduct(productId: string, index: number) {
        if (productId) {
            await axios.delete(`${apiBaseUrl}/product/${productId}`)
        }

        remove(index)
    }

    function getSizeFields(key: string | undefined) {
        if (!key) {
            return []
        }

        const productCategory = productCategories.find((category) => category.key === key)
        return productCategory ? productCategory.sizeFields : []
    }

    function isOneSizeFitsAll(key: string) {
        const sizeFields = productCategories.find((category) => category.key === key)?.sizeFields

        if (sizeFields) {
            let response = true

            Object.values(sizeFields).forEach((sizeField) => {
                if (sizeField.show) {
                    response = false
                }
            })

            return response
        }

        return true
    }

    function updateTotalQuantity(productIndex: number) {
        const formValues = form.getValues()
        const product = formValues.products[productIndex]

        if (product) {
            const { quantityOfXS, quantityOfSM, quantityOfMD, quantityOfLG, quantityOfXL, quantityOf2XL, quantityOf3XL, quantityOf4XL } = product
            const totalQuantity =
                Number(quantityOfXS) + Number(quantityOfSM) + Number(quantityOfMD) + Number(quantityOfLG) + Number(quantityOfXL) + Number(quantityOf2XL) + Number(quantityOf3XL) + Number(quantityOf4XL)
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
        const subscription = watch((value, { name, type }) => {
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
    }, [watch])

    return (
        <Form {...form}>
            <form>
                <div className="flex size-full flex-col gap-4">
                    <Card className="shrink-0">
                        <CardHeader className="w-full justify-between bg-brand-primary text-black">
                            {showImportButton ? (
                                <SalesOrderImportModal
                                    onImport={(data) => {
                                        form.setValue('products', data)
                                    }}
                                />
                            ) : (
                                <div />
                            )}
                            <h1 className="flex-none self-center text-2xl font-bold">Sales Order Form</h1>
                            {salesOrder && (
                                <div className="flex gap-4">
                                    <InputField
                                        form={form}
                                        name="externalId"
                                        label="SO#"
                                        labelPlacement="outside-left"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        defaultValue={salesOrder.externalId}
                                    />
                                </div>
                            )}
                        </CardHeader>
                        <CardBody className="gap-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <DatePickerField
                                            form={form}
                                            name="orderDate"
                                            label="ORDER DATE"
                                            hideTimeZone={true}
                                            granularity="day"
                                            showMonthAndYearPickers={true}
                                            isRequired={true}
                                            variant="bordered"
                                            size="sm"
                                        />
                                        <DatePickerField
                                            form={form}
                                            name="dueDate"
                                            label="DUE DATE"
                                            hideTimeZone={true}
                                            granularity="day"
                                            showMonthAndYearPickers={true}
                                            isRequired={true}
                                            variant="bordered"
                                            size="sm"
                                        />
                                    </div>
                                    <InputField
                                        form={form}
                                        name="referenceId"
                                        label="REFERENCE #"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <InputField
                                        form={form}
                                        name="salesRepName"
                                        label="SALES REP NAME"
                                        placeholder=" "
                                        isRequired={true}
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <InputField
                                        form={form}
                                        name="salesRepEmailAddress"
                                        label="SALES REP EMAIL ADDRESS"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <div className="flex flex-col gap-2">
                                        <CheckboxField
                                            form={form}
                                            name="isNewCustomer"
                                            size="sm"
                                        >
                                            NEW CUSTOMER
                                        </CheckboxField>
                                        <p className="text-small text-default-500">
                                            *If customer already exists, then leave this unchecked.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <InputField
                                        form={form}
                                        label="COMPANY NAME"
                                        name="companyName"
                                        placeholder=" "
                                        isRequired={true}
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <InputField
                                        form={form}
                                        label="CONTACT NAME"
                                        name="contactName"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <InputField
                                        form={form}
                                        label="PHONE NUMBER"
                                        name="phoneNumber"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <InputField
                                        form={form}
                                        label="EMAIL ADDRESS"
                                        name="emailAddress"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <InputField
                                        form={form}
                                        label="SHIPPING ADDRESS"
                                        name="shippingAddress"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <InputField
                                        form={form}
                                        label="BILLING ADDRESS"
                                        name="billingAddress"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                    />
                                    <TextAreaField
                                        form={form}
                                        label="NOTES"
                                        name="notes"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        disableAutosize={true}
                                        classNames={{
                                            input: 'resize-y h-20 min-h-5',
                                        }}
                                    />
                                    <TextAreaField
                                        form={form}
                                        label="TRACKING #"
                                        name="trackingNumber"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        disableAutosize={true}
                                        classNames={{
                                            input: 'resize-y h-5 min-h-5',
                                        }}
                                    />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    {products.length > 0 && (
                        <Card>
                            <CardBody className="gap-4">
                                {products.map((product, index) => (
                                    <div
                                        key={product.rhfId}
                                        className="flex w-full gap-4 border-b-zinc-300 dark:border-b-black"
                                    >
                                        <div className="w-[90px] flex-none">
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.item` as const}
                                                render={({ field, fieldState }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Select
                                                                {...field}
                                                                {...form.register(`products.${index}.item` as const)}
                                                                items={productCategories.filter((productCategory) => {
                                                                    return {
                                                                        key: productCategory.key,
                                                                        label: productCategory.label,
                                                                    }
                                                                })}
                                                                label="ITEM"
                                                                placeholder=" "
                                                                variant="bordered"
                                                                size="sm"
                                                                labelPlacement="outside"
                                                                isInvalid={fieldState.invalid}
                                                                errorMessage={fieldState.error?.message}
                                                                classNames={{
                                                                    value: 'text-foreground',
                                                                    listboxWrapper: 'overscroll-contain',
                                                                    popoverContent: 'w-auto',
                                                                }}
                                                            >
                                                                {(item) => (
                                                                    <SelectItem
                                                                        key={item.key}
                                                                        textValue={item.key}
                                                                    >
                                                                        {item.label}
                                                                    </SelectItem>
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="w-[150px] flex-none">
                                            <InputField
                                                form={form}
                                                label="FILE NAME"
                                                name={`products.${index}.fileName` as const}
                                                placeholder=" "
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="min-w-[100px] max-w-[150px] flex-auto">
                                            <InputField
                                                form={form}
                                                label="STYLE"
                                                name={`products.${index}.style` as const}
                                                placeholder=" "
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="min-w-[100px] max-w-[150px] flex-auto">
                                            <InputField
                                                form={form}
                                                label="COLOR"
                                                name={`products.${index}.color` as const}
                                                placeholder=" "
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[100px] flex-none">
                                            <FormField
                                                disabled={form.formState.isSubmitting}
                                                control={form.control}
                                                name={`products.${index}.mockupImageUrl` as const}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <FileUpload
                                                                endpoint={isProduction ? 'mockups' : 'devMockups'}
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="w-full min-w-[150px] flex-auto">
                                            <TextAreaField
                                                form={form}
                                                label="NOTES"
                                                name={`products.${index}.notes` as const}
                                                placeholder=" "
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                                disableAutosize={true}
                                                classNames={{
                                                    inputWrapper: 'py-0',
                                                    input: 'resize-y h-20 h-5 min-h-5',
                                                }}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            {Object.values(getSizeFields(productsOutput[index]?.item)).length === 0 ? (
                                                <div className="flex w-[712px] flex-auto items-center justify-center">
                                                    Select an item to add quantities for this product!
                                                </div>
                                            ) : (
                                                Object.values(getSizeFields(productsOutput[index]?.item)).map((sizeField) =>
                                                    sizeField.show ? (
                                                        <div
                                                            key={`${index}-${sizeField.label}`}
                                                            className="w-[75px] flex-auto"
                                                        >
                                                            <NumberInputField
                                                                preventValueChangeOnScroll
                                                                form={form}
                                                                label={sizeField.label}
                                                                name={`products.${index}.${sizeField.name}` as const}
                                                                variant="bordered"
                                                                size="sm"
                                                                labelPlacement="outside"
                                                                min={0}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div
                                                            key={`${index}-${sizeField.label}`}
                                                            className="flex w-[75px] flex-auto items-center justify-center"
                                                        >
                                                            <p>-</p>
                                                        </div>
                                                    )
                                                )
                                            )}
                                        </div>
                                        <div className="w-[75px] shrink-0">
                                            <NumberInputField
                                                preventValueChangeOnScroll
                                                isReadOnly={product.item ? !isOneSizeFitsAll(product.item) : false}
                                                form={form}
                                                label={product.item && isOneSizeFitsAll(product.item) ? 'QUANTITY' : 'TOTAL'}
                                                name={`products.${index}.totalQuantity` as const}
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                                min={0}
                                            />
                                        </div>
                                        <div className="w-[125px] shrink-0">
                                            <NumberInputField
                                                preventValueChangeOnScroll
                                                form={form}
                                                label="UNIT PRICE"
                                                name={`products.${index}.unitPrice` as const}
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <p className="text-small">$</p>
                                                    </div>
                                                }
                                            />
                                        </div>
                                        <div className="w-[125px] shrink-0">
                                            <NumberInputField
                                                preventValueChangeOnScroll
                                                isReadOnly
                                                form={form}
                                                label="SUBTOTAL"
                                                name={`products.${index}.subtotal` as const}
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <p className="text-small">$</p>
                                                    </div>
                                                }
                                            />
                                        </div>
                                        <div className="shrink-0 self-end">
                                            <Button
                                                isIconOnly
                                                variant="light"
                                                size="sm"
                                                color="danger"
                                                className="text-danger"
                                                onPress={onOpen}
                                            >
                                                <HiTrash className="size-4" />
                                            </Button>
                                            <Modal
                                                isOpen={isOpen}
                                                onOpenChange={onOpenChange}
                                                isDismissable={false}
                                                isKeyboardDismissDisabled={false}
                                                hideCloseButton={true}
                                            >
                                                <ModalContent>
                                                    {(onClose) => (
                                                        <>
                                                            <ModalHeader className="flex flex-col gap-1">
                                                                Are you sure?
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                <p>
                                                                    Deleting this product from the sales order is permanent and cannot be undone,
                                                                    even if you decide to cancel editing this form.
                                                                </p>
                                                                <p>
                                                                    Are you sure this is what you want to do?
                                                                </p>
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button
                                                                    size="sm"
                                                                    color="danger"
                                                                    variant="light"
                                                                    onPress={onClose}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-brand-primary text-black"
                                                                    onPress={async () => {
                                                                        await handleRemoveProduct(product.id, index)
                                                                        onClose()
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </ModalFooter>
                                                        </>
                                                    )}
                                                </ModalContent>
                                            </Modal>
                                        </div>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    )}
                    <div className="flex w-full items-center justify-center gap-4">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="solid"
                                    size="sm"
                                    className="bg-brand-primary text-black"
                                >
                                    Add Product
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Action event example"
                                onAction={(key) =>
                                    append({
                                        ...defaultSalesOrderProduct,
                                        item: String(key),
                                    })
                                }
                                classNames={{
                                    list: 'max-h-96 overflow-scroll overscroll-contain',
                                }}
                            >
                                {productCategories.map((productCategory) => (
                                    <DropdownItem key={productCategory.key}>{productCategory.label}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Card className="shrink-0">
                        <CardBody className="w-full flex-row justify-end">
                            {/* TODO: Display any errors here. */}
                            {/*<div>*/}
                            {/*    {errors}*/}
                            {/*</div>*/}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">DISCOUNT</p>
                                    <div className="w-[125px] flex-none">
                                        <NumberInputField
                                            preventValueChangeOnScroll
                                            form={form}
                                            name="discount"
                                            variant="bordered"
                                            size="sm"
                                            labelPlacement="outside-left"
                                            min={0}
                                            max={100}
                                            classNames={{
                                                inputWrapper: 'flex-none w-[125px]',
                                            }}
                                            endContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <p className="text-small">%</p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">SHIPPING COST</p>
                                    <div className="w-[125px] flex-none">
                                        <NumberInputField
                                            preventValueChangeOnScroll
                                            form={form}
                                            name="shippingPrice"
                                            variant="bordered"
                                            size="sm"
                                            labelPlacement="outside-left"
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <p className="text-small">$</p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">GRAND TOTAL</p>
                                    <div className="w-[125px] flex-none">
                                        <NumberInputField
                                            preventValueChangeOnScroll
                                            isReadOnly
                                            form={form}
                                            name="grandTotal"
                                            variant="bordered"
                                            size="sm"
                                            labelPlacement="outside-left"
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <p className="text-small">$</p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full justify-end gap-4">
                                    {salesOrder && (
                                        <Button
                                            type="button"
                                            variant="bordered"
                                            color="danger"
                                            size="sm"
                                            className="text-danger"
                                            onPress={handleFormResetAndClose}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                    <Button
                                        isDisabled={isLoading}
                                        variant="solid"
                                        size="sm"
                                        className="w-full bg-brand-primary text-black"
                                        onPress={() => onSubmit()}
                                    >
                                        {salesOrder ? 'Save' : 'Submit'}
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </form>
            {/*<DevTool control={form.control} />*/}
        </Form>
    )
}
