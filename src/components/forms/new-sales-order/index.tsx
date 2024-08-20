'use client'

import axios from 'axios'
import { now, getLocalTimeZone } from '@internationalized/date'
import { CheckboxField, DatePickerField, InputField, TextAreaField } from '@/components/forms/fields'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react'
import { Form } from '@/components/ui/form'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { DateValue } from '@internationalized/date'

export type SalesOrder = {
    orderDate: DateValue
    dueDate: DateValue
    salesRepName: string
    externalId?: string
    isNewCustomer?: boolean
    companyName?: string
    contactName?: string
    phoneNumber?: string
    emailAddress?: string
    shippingAddress?: string
    billingAddress?: string
    notes?: string
    shippingPrice: number
    grandTotal: number
    products: Product[]
}

export type Product = {
    item?: string
    fileName?: string
    style?: string
    color?: string
    notes?: string
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

const today = now(getLocalTimeZone())

const defaultSalesOrder: SalesOrder = {
    orderDate: today,
    dueDate: today.add({ weeks: 3 }),
    salesRepName: '',
    externalId: '',
    isNewCustomer: false,
    companyName: '',
    contactName: '',
    phoneNumber: '',
    emailAddress: '',
    shippingAddress: '',
    billingAddress: '',
    notes: '',
    shippingPrice: 0.00,
    grandTotal: 0.00,
    products: []
}

const defaultProduct: Product = {
    item: '',
    fileName: '',
    style: '',
    color: '',
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

const productCategories = [
    { key: 'TEE', label: 'T-Shirt', fieldLayout: 'Tees' },
    { key: 'HDE', label: 'Hoodie', fieldLayout: 'Tees' },
    { key: 'HAT', label: 'Hat', fieldLayout: 'Gear' },
    { key: 'SCK', label: 'Socks', fieldLayout: 'Gear' },
    { key: 'GTR', label: 'Gaiter', fieldLayout: 'Gear' },
    { key: 'SWC', label: 'Sweatshirt Crew', fieldLayout: 'Tees' },
    { key: 'LTEE', label: 'Long Sleeve T-Shirt', fieldLayout: 'Tees' },
    { key: 'VSR', label: 'Visor', fieldLayout: 'Gear' },
    { key: 'STK', label: 'Sticker', fieldLayout: 'Gear' },
    { key: 'YTEE', label: 'Youth T-Shirt', fieldLayout: 'Tees' },
    { key: 'YHDE', label: 'Youth Hoodie', fieldLayout: 'Tees' },
    { key: 'YHAT', label: 'Youth Hat', fieldLayout: 'Gear' },
    { key: 'YSCK', label: 'Youth Socks', fieldLayout: 'Gear' },
    { key: 'YSWC', label: 'Youth Sweatshirt Crew', fieldLayout: 'Tees' },
    { key: 'YLTEE', label: 'Youth Long Sleeve T-Shirt', fieldLayout: 'Tees' },
]

const getFieldLayout = (key: string) => {
    return productCategories.find((productCategory) => productCategory.key === key)?.fieldLayout
}

export function NewSalesOrder() {
    const form = useForm<SalesOrder>({ defaultValues: defaultSalesOrder })

    const { control, handleSubmit, formState, watch } = form
    const { errors } = formState

    const { fields: products, append } = useFieldArray({
        control: control,
        name: 'products',
    })

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)

        await axios.post('https://www.gearwfm.com/api/v1/forms/new-sales-order', data)

        toast('New sales order has been submitted!')
    })

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
        const { shippingPrice, products } = formValues
        const subtotalSum = products.reduce((total, product) => total + product.subtotal, 0)
        const grandTotal = Number(subtotalSum) + Number(shippingPrice)
        form.setValue('grandTotal', grandTotal)
    }

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name) {
                // Update value of the grandTotal field when the shippingPrice field has been updated.
                if (name.includes('shippingPrice')) {
                    updateGrandTotal()
                }

                // Update fields in each product
                if (name && name.startsWith('products')) {
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
                        <CardHeader className="bg-[#0072ce] text-white justify-center w-full">
                            <h1 className="text-2xl font-bold">
                                New Sales Order
                            </h1>
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
                                        name="externalId"
                                        label="SO#"
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
                                        // disableAutosize={true}
                                        // classNames={{
                                        //     input: 'min-h-full',
                                        // }}
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
                                            <InputField
                                                isReadOnly
                                                form={form}
                                                label="ITEM"
                                                name={`products.${index}.item` as const}
                                                placeholder=" "
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
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
                                        <div className="flex-auto w-full min-w-[150px]">
                                            {/*<TextAreaField*/}
                                            {/*    form={form}*/}
                                            {/*    label="NOTES"*/}
                                            {/*    name={`products.${index}.notes` as const}*/}
                                            {/*    placeholder=" "*/}
                                            {/*    variant="bordered"*/}
                                            {/*    size="sm"*/}
                                            {/*    labelPlacement="outside"*/}
                                            {/*    maxRows={1}*/}
                                            {/*/>*/}
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
                                        {product.item && getFieldLayout(product.item) === 'Tees' && (
                                            <div className="flex gap-4">
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="XS"
                                                        name={`products.${index}.quantityOfXS` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="SM"
                                                        name={`products.${index}.quantityOfSM` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="MD"
                                                        name={`products.${index}.quantityOfMD` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="LG"
                                                        name={`products.${index}.quantityOfLG` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="XL"
                                                        name={`products.${index}.quantityOfXL` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="2XL"
                                                        name={`products.${index}.quantityOf2XL` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="3XL"
                                                        name={`products.${index}.quantityOf3XL` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                                <div className="flex-auto w-[75px]">
                                                    <InputField
                                                        form={form}
                                                        label="4XL"
                                                        name={`products.${index}.quantityOf4XL` as const}
                                                        type="number"
                                                        defaultValue="0"
                                                        variant="bordered"
                                                        size="sm"
                                                        labelPlacement="outside"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex-shrink-0 w-[75px]">
                                            <InputField
                                                isReadOnly={product.item !== 'HAT'}
                                                form={form}
                                                label={product.item !== 'HAT' ? 'TOTAL' : 'QUANTITY'}
                                                name={`products.${index}.totalQuantity` as const}
                                                type="number"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="flex-shrink-0 w-[75px]">
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
                                        <div className="flex-shrink-0 w-[75px]">
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
                                    color="primary"
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
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">
                                        SHIPPING COST
                                    </p>
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
                                <div className="flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium">
                                        GRAND TOTAL
                                    </p>
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
                                <Button
                                    type="submit"
                                    variant="solid"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </form>
        </Form>
    )
}
