'use client'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { now, getLocalTimeZone, CalendarDateTime,  } from '@internationalized/date'
import { CheckboxField, DatePickerField, InputField, TextAreaField, UsdInputField } from '@/components/forms/fields'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Select,
    SelectItem,
} from '@nextui-org/react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { FileUpload } from '@/components/common/file-upload'
import { SalesOrderImportModal } from '@/components/sales-order/sales-order-import-modal'
import { useEffect } from 'react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { HiTrash, HiXMark } from 'react-icons/hi2'
import { productCategories } from '@/lib/constants/product-categories'
import type { DateValue } from '@internationalized/date'
import type { SalesOrderAndRelations } from '@/types'

// import { DevTool } from '@hookform/devtools'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const today = now(getLocalTimeZone())

export type SalesOrderType = {
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
    products: ProductType[]
    assembledProducts: AssembledProductType[]
}

export type ProductType = {
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

export type AssembledProductType = {
    id: string
    item: string
    allAssembled: boolean
}

type Props = {
    salesOrder?: SalesOrderAndRelations
    mutate?: any
    onClose?: () => void
    showImportButton?: boolean
}

export function SalesOrderForm({ salesOrder, mutate, onClose, showImportButton = false }: Props) {
    const { user } = useUser()

    const router = useRouter()

    let defaultSalesOrder: SalesOrderType = {
        id: '',
        orderDate: today,
        dueDate: today.add({ weeks: 3 }),
        salesRepName: user ? `${user.firstName} ${user.lastName}` : '',
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
        shippingPrice: 0.00,
        grandTotal: 0.00,
        products: [],
        assembledProducts: [],
    }

    if (salesOrder) {
        const orderDate = new Date(salesOrder.orderDate)
        const dueDate = new Date(salesOrder.dueDate)
        const formattedOrderDate = new CalendarDateTime(orderDate.getUTCFullYear(), orderDate.getUTCMonth() + 1, orderDate.getUTCDate())
        const formattedDueDate = new CalendarDateTime(dueDate.getUTCFullYear(), dueDate.getUTCMonth() + 1, dueDate.getUTCDate())

        defaultSalesOrder = {
            ...salesOrder,
            orderDate: formattedOrderDate,
            dueDate: formattedDueDate,
        }
    }

    const defaultProduct: ProductType = {
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
        unitPrice: 0.00,
        subtotal: 0.00,
    }

    const form = useForm<SalesOrderType>({ defaultValues: defaultSalesOrder })
    const { control, handleSubmit, formState, watch } = form
    const { errors } = formState

    const { fields: products, append, remove } = useFieldArray({
        name: 'products',
        control: control,
    })

    const productsOutput = useWatch({
        name: 'products',
        control: control,
        defaultValue: products,
    })

    const onSubmit = handleSubmit(async (data) => {
        if (salesOrder) {
            await axios.post(`${apiBaseUrl}/forms/update-sales-order`, data)

            if (mutate) {
                mutate()
            }

            router.back()

            toast('Sales order has been updated!')
        } else {
            await axios.post(`${apiBaseUrl}/forms/new-sales-order`, data)
            toast('New sales order has been submitted!')
        }
    })

    function getSizeFields(key: string) {
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
        const { quantityOfXS, quantityOfSM, quantityOfMD, quantityOfLG, quantityOfXL, quantityOf2XL, quantityOf3XL, quantityOf4XL } = product
        const totalQuantity = Number(quantityOfXS) + Number(quantityOfSM) + Number(quantityOfMD) + Number(quantityOfLG) + Number(quantityOfXL) + Number(quantityOf2XL) + Number(quantityOf3XL) + Number(quantityOf4XL)
        form.setValue(`products.${productIndex}.totalQuantity`, totalQuantity)
    }

    function updateSubTotal(productIndex: number) {
        const formValues = form.getValues()
        const product = formValues.products[productIndex]
        const { totalQuantity, unitPrice } = product
        const subtotal = Number(totalQuantity) * Number(unitPrice)
        form.setValue(`products.${productIndex}.subtotal`, subtotal)
    }

    function updateGrandTotal() {
        const formValues = form.getValues()
        const { discount, shippingPrice, products } = formValues
        const subtotalSum = products.reduce((total, product) => total + product.subtotal, 0)
        const discountAmount = subtotalSum * (discount / 100)
        const grandTotal = (subtotalSum - discountAmount) + Number(shippingPrice)
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
            <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-4 h-full w-full">
                    <Card className="shrink-0">
                        <CardHeader className="bg-brand-primary text-black justify-between w-full">
                            {showImportButton ? (
                                <SalesOrderImportModal onImport={(data) => {
                                    form.setValue('products', data)
                                }} />
                            ) : <div />}
                            <h1 className="flex-none self-center text-2xl font-bold">
                                Sales Order Form
                            </h1>
                            {salesOrder ? (
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
                                    {onClose && (
                                        <Button
                                            isIconOnly
                                            variant="light"
                                            size="sm"
                                            onPress={onClose}
                                        >
                                            <HiXMark className="size-4"/>
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    {onClose && (
                                        <Button
                                            isIconOnly
                                            variant="light"
                                            size="sm"
                                            onPress={onClose}
                                        >
                                            <HiXMark className="size-4"/>
                                        </Button>
                                    )}
                                </div>
                            )}
                        </CardHeader>
                        <CardBody className="gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex gap-4">
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
                                        <InputField
                                            form={form}
                                            name="referenceId"
                                            label="REFERENCE #"
                                            placeholder=" "
                                            variant="bordered"
                                            size="sm"
                                            className="w-full"
                                        />
                                    </div>
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
                                        <p className="text-default-500 text-small">
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
                                        maxRows={3}
                                    />
                                    <TextAreaField
                                        form={form}
                                        label="TRACKING NUMBER"
                                        name="trackingNumber"
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        maxRows={1}
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
                                        key={product.id}
                                        className="flex w-full gap-4 border-b-zinc-300 dark:border-b-black"
                                    >
                                        <div className="flex-none w-[75px]">
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.item` as const}
                                                render={({field, fieldState}) => (
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
                                                                    <SelectItem key={item.key} textValue={item.key}>
                                                                        {item.label}
                                                                    </SelectItem>
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex-none w-[150px]">
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
                                        <div className="flex-auto min-w-[100px] max-w-[150px]">
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
                                        <div className="flex-auto min-w-[100px] max-w-[150px]">
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
                                        <div className="flex-none w-[100px]">
                                            <FormField
                                                disabled={form.formState.isSubmitting}
                                                control={form.control}
                                                name={`products.${index}.mockupImageUrl` as const}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <FileUpload
                                                                endpoint={isProduction ? 'mockups' : 'devMockups'}
                                                                onChange={field.onChange}
                                                                value={field.value}
                                                            />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex-auto w-full min-w-[150px]">
                                            <InputField
                                                form={form}
                                                label="NOTES"
                                                name={`products.${index}.notes` as const}
                                                placeholder=" "
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            {Object.values(getSizeFields(productsOutput[index]?.item)).length === 0 ? (
                                                <div className="flex-auto w-[712px] flex items-center justify-center">
                                                    Select an item to add quantities for this product!
                                                </div>
                                            ) : (
                                                Object.values(getSizeFields(productsOutput[index]?.item)).map((sizeField) => (
                                                    sizeField.show ? (
                                                        <div key={`${index}-${sizeField.label}`}
                                                             className="flex-auto w-[75px]">
                                                            <InputField
                                                                form={form}
                                                                label={sizeField.label}
                                                                name={`products.${index}.${sizeField.name}` as const}
                                                                type="number"
                                                                variant="bordered"
                                                                size="sm"
                                                                labelPlacement="outside"
                                                                min={0}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div key={`${index}-${sizeField.label}`}
                                                             className="flex-auto w-[75px] flex items-center justify-center">
                                                            <p>
                                                                -
                                                            </p>
                                                        </div>
                                                    )
                                                ))
                                            )}
                                        </div>
                                        <div className="flex-shrink-0 w-[75px]">
                                            <InputField
                                                isReadOnly={product.item ? !isOneSizeFitsAll(product.item) : false}
                                                form={form}
                                                label={product.item && isOneSizeFitsAll(product.item) ? 'QUANTITY' : 'TOTAL'}
                                                name={`products.${index}.totalQuantity` as const}
                                                type="number"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                                min={0}
                                            />
                                        </div>
                                        <div className="flex-shrink-0 w-[125px]">
                                            <InputField
                                                form={form}
                                                label="UNIT PRICE"
                                                name={`products.${index}.unitPrice` as const}
                                                type="number"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <p className="text-small">
                                                            $
                                                        </p>
                                                    </div>
                                                }
                                            />
                                        </div>
                                        <div className="flex-shrink-0 w-[125px]">
                                            <InputField
                                                isReadOnly
                                                form={form}
                                                label="SUBTOTAL"
                                                name={`products.${index}.subtotal` as const}
                                                type="number"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                                startContent={
                                                    <div className="pointer-events-none flex items-center">
                                                        <p className="text-small">
                                                            $
                                                        </p>
                                                    </div>
                                                }
                                            />
                                        </div>
                                        <div className="flex-shrink-0 self-end">
                                            <Button
                                                isIconOnly
                                                variant="light"
                                                size="sm"
                                                color="danger"
                                                className="text-danger"
                                                onPress={() => remove(index)}
                                            >
                                                <HiTrash className="size-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    )}
                    <div className="flex items-center justify-center w-full gap-4">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    variant="solid"
                                    className="bg-brand-primary text-black"
                                >
                                    Add Product
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Action event example"
                                onAction={(key) => append({
                                    ...defaultProduct,
                                    item: String(key),
                                })}
                                classNames={{
                                    list: 'max-h-96 overflow-scroll overscroll-contain',
                                }}
                            >
                                {productCategories.map((productCategory) => (
                                    <DropdownItem key={productCategory.key}>
                                        {productCategory.label}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Card className="shrink-0">
                        <CardBody className="flex-row justify-end w-full">
                            {/* TODO: Display any errors here. */}
                            {/*<div>*/}
                            {/*    {errors}*/}
                            {/*</div>*/}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">
                                        DISCOUNT
                                    </p>
                                    <div className="flex-none w-[125px]">
                                        <InputField
                                            form={form}
                                            name="discount"
                                            type="number"
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
                                                    <p className="text-small">
                                                        %
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">
                                        SHIPPING COST
                                    </p>
                                    <div className="flex-none w-[125px]">
                                        <InputField
                                            form={form}
                                            // label="SHIPPING COST"
                                            name="shippingPrice"
                                            type="number"
                                            variant="bordered"
                                            size="sm"
                                            labelPlacement="outside-left"
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <p className="text-small">
                                                        $
                                                    </p>
                                                </div>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">
                                        GRAND TOTAL
                                    </p>
                                    <div className="flex-none w-[125px]">
                                        <InputField
                                            isReadOnly
                                            form={form}
                                            // label="GRAND TOTAL"
                                            name="grandTotal"
                                            type="number"
                                            variant="bordered"
                                            size="sm"
                                            labelPlacement="outside-left"
                                            startContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <p className="text-small">
                                                        $
                                                    </p>
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
                                            className="text-danger"
                                            onPress={() => router.back()}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        variant="solid"
                                        className="bg-brand-primary text-black w-full"
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
