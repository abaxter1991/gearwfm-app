'use client'

import axios from 'axios'
import { now, getLocalTimeZone } from '@internationalized/date'
import { CheckboxField, DatePickerField, InputField } from '@/components/forms/fields'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Checkbox,
    Divider,
    Select,
    SelectItem,
} from '@nextui-org/react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { HiPlus } from 'react-icons/hi2'
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

        await axios.post('http://localhost:3000/api/v1/forms/new-sales-order', data)

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
        <Card>
            <Form {...form}>
                <form onSubmit={onSubmit} className="flex flex-col h-full rounded-lg overflow-scroll">
                    <CardHeader className="bg-[#0072ce] text-white justify-center w-full">
                        <h1 className="text-2xl font-bold">
                            BAXBO DISTRIBUTION
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
                                    placeholder="John Doe"
                                    isRequired={true}
                                    variant="bordered"
                                    size="sm"
                                />
                                <InputField
                                    form={form}
                                    name="externalId"
                                    label="SO#"
                                    placeholder="SO-123456789"
                                    variant="bordered"
                                    size="sm"
                                />
                                {/*<FormField*/}
                                {/*    control={form.control}*/}
                                {/*    name="isNewCustomer"*/}
                                {/*    render={({field}) => (*/}
                                {/*        <FormItem>*/}
                                {/*            <FormControl>*/}
                                {/*                <div className="flex flex-col gap-2">*/}
                                {/*                    <Checkbox*/}
                                {/*                        size="sm"*/}
                                {/*                        isSelected={field.value}*/}
                                {/*                        onValueChange={field.onChange}*/}
                                {/*                    >*/}
                                {/*                        NEW CUSTOMER*/}
                                {/*                    </Checkbox>*/}
                                {/*                    <p className="text-default-500 text-small">*/}
                                {/*                        *If customer already exists, then leave this unchecked.*/}
                                {/*                    </p>*/}
                                {/*                </div>*/}
                                {/*            </FormControl>*/}
                                {/*        </FormItem>*/}
                                {/*    )}*/}
                                {/*/>*/}
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
                                    placeholder="Acme"
                                    variant="bordered"
                                    size="sm"
                                />
                                <InputField
                                    form={form}
                                    label="CONTACT NAME"
                                    name="contactName"
                                    placeholder="Jane Doe"
                                    variant="bordered"
                                    size="sm"
                                />
                                <InputField
                                    form={form}
                                    label="PHONE NUMBER"
                                    name="phoneNumber"
                                    placeholder="555-555-5555"
                                    variant="bordered"
                                    size="sm"
                                />
                                <InputField
                                    form={form}
                                    label="EMAIL ADDRESS"
                                    name="emailAddress"
                                    placeholder="jane.doe@example.com"
                                    variant="bordered"
                                    size="sm"
                                />
                            </div>
                            <div className="space-y-4">
                                <InputField
                                    form={form}
                                    label="SHIPPING ADDRESS"
                                    name="shippingAddress"
                                    placeholder="Enter shipping address"
                                    variant="bordered"
                                    size="sm"
                                />
                                <InputField
                                    form={form}
                                    label="BILLING ADDRESS"
                                    name="billingAddress"
                                    placeholder="Enter billing address"
                                    variant="bordered"
                                    size="sm"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <Card>
                                {products.length > 0 && (
                                    <>
                                        <CardBody className="gap-4">
                                            {products.map((product, index) => (
                                                <div key={product.id}
                                                     className="flex w-full gap-4 border-b-zinc-300 dark:border-b-black">
                                                    {/*<div key={product.id} className="grid grid-cols-8">*/}
                                                    <div className="flex-shrink-0 w-[150px]">
                                                        <FormField
                                                            control={form.control}
                                                            name={`products.${index}.item` as const}
                                                            render={({field, fieldState}) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Select
                                                                            {...field}
                                                                            {...form.register(`products.${index}.item` as const)}
                                                                            items={[
                                                                                {key: 'TEE', label: 'T-Shirt'},
                                                                                {key: 'HDE', label: 'Hoodie'},
                                                                                {key: 'HAT', label: 'Hat'},
                                                                            ]}
                                                                            label="ITEM"
                                                                            placeholder=" "
                                                                            variant="bordered"
                                                                            size="sm"
                                                                            labelPlacement="outside"
                                                                            isInvalid={fieldState.invalid}
                                                                            errorMessage={fieldState.error?.message}
                                                                        >
                                                                            {(item) => (
                                                                                <SelectItem key={item.key}>
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
                                                    <div className="flex-shrink-0 w-[250px]">
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
                                                    <div className="flex-shrink-0 w-[150px]">
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
                                                    <div className="flex-shrink-0 w-[150px]">
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
                                                    {product.item !== 'HAT' && (
                                                        <div className="flex gap-4">
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                            <div className="flex-shrink-0 w-[100px]">
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
                                                    <div className="flex-shrink-0 w-[100px]">
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
                                                    <div className="w-full">
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
                                                    <div className="flex-shrink-0 w-[100px]">
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
                                                    <div className="flex-shrink-0 w-[100px]">
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
                                        <Divider />
                                    </>
                                )}
                                <CardFooter>
                                    <div className="flex items-center justify-center w-full gap-4">
                                        <Button
                                            type="button"
                                            variant="solid"
                                            color="primary"
                                            className="w-32"
                                            onClick={() => append({...defaultProduct, item: 'TEE'})}
                                        >
                                            Add T-Shirt
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="solid"
                                            color="primary"
                                            className="w-32"
                                            onClick={() => append({...defaultProduct, item: 'HDE'})}
                                        >
                                            Add Hoodie
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="solid"
                                            color="primary"
                                            className="w-32"
                                            onClick={() => append({...defaultProduct, item: 'HAT'})}
                                        >
                                            Add Hat
                                        </Button>
                                    </div>
                                </CardFooter>
                                {/*<Table>*/}
                                {/*    <TableHeader className="bg-zinc-300 dark:bg-black">*/}
                                {/*        <TableRow className="dark:border-b-black">*/}
                                {/*            <TableHead className="text-center w-[150px]">ITEM</TableHead>*/}
                                {/*            <TableHead className="text-center">FILE NAME</TableHead>*/}
                                {/*            <TableHead className="text-center">STYLE</TableHead>*/}
                                {/*            <TableHead className="text-center">COLOR</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">XS</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">SM</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">MD</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">LG</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">XL</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">2XL</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">3XL</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">4XL</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">TOTAL</TableHead>*/}
                                {/*            <TableHead className="text-center">NOTES</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">UNIT PRICE</TableHead>*/}
                                {/*            <TableHead className="text-center w-[125px]">SUBTOTAL</TableHead>*/}
                                {/*        </TableRow>*/}
                                {/*    </TableHeader>*/}
                                {/*    <TableBody>*/}
                                {/*        {products.map((product, index) => (*/}
                                {/*            <TableRow key={product.id} className="border-b-zinc-300 dark:border-b-black">*/}
                                {/*                <TableCell>*/}
                                {/*                    <FormField*/}
                                {/*                        control={form.control}*/}
                                {/*                        name={`products.${index}.item` as const}*/}
                                {/*                        render={({ field, fieldState }) => (*/}
                                {/*                            <FormItem>*/}
                                {/*                                <FormControl>*/}
                                {/*                                    <Select*/}
                                {/*                                        {...field}*/}
                                {/*                                        {...form.register(`products.${index}.item` as const)}*/}
                                {/*                                        items={[*/}
                                {/*                                            { key: 'TEE', label: 'T-Shirt' },*/}
                                {/*                                            { key: 'HDE', label: 'Hoodie' },*/}
                                {/*                                            { key: 'HAT', label: 'Hat' },*/}
                                {/*                                        ]}*/}
                                {/*                                        label="ITEM"*/}
                                {/*                                        placeholder=" "*/}
                                {/*                                        variant="bordered"*/}
                                {/*                                        size="sm"*/}
                                {/*                                        labelPlacement="outside"*/}
                                {/*                                        isInvalid={fieldState.invalid}*/}
                                {/*                                        errorMessage={fieldState.error?.message}*/}
                                {/*                                    >*/}
                                {/*                                        {(item) => (*/}
                                {/*                                            <SelectItem key={item.key}>*/}
                                {/*                                                {item.label}*/}
                                {/*                                            </SelectItem>*/}
                                {/*                                        )}*/}
                                {/*                                    </Select>*/}
                                {/*                                </FormControl>*/}
                                {/*                                <FormMessage/>*/}
                                {/*                            </FormItem>*/}
                                {/*                        )}*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*                <TableCell>*/}
                                {/*                    <InputField*/}
                                {/*                        form={form}*/}
                                {/*                        label="FILE NAME"*/}
                                {/*                        name={`products.${index}.fileName` as const}*/}
                                {/*                        placeholder=" "*/}
                                {/*                        variant="bordered"*/}
                                {/*                        size="sm"*/}
                                {/*                        labelPlacement="outside"*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*                <TableCell>*/}
                                {/*                    <InputField*/}
                                {/*                        form={form}*/}
                                {/*                        label="STYLE"*/}
                                {/*                        name={`products.${index}.style` as const}*/}
                                {/*                        placeholder=" "*/}
                                {/*                        variant="bordered"*/}
                                {/*                        size="sm"*/}
                                {/*                        labelPlacement="outside"*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*                <TableCell>*/}
                                {/*                    <InputField*/}
                                {/*                        form={form}*/}
                                {/*                        label="COLOR"*/}
                                {/*                        name={`products.${index}.color` as const}*/}
                                {/*                        placeholder=" "*/}
                                {/*                        variant="bordered"*/}
                                {/*                        size="sm"*/}
                                {/*                        labelPlacement="outside"*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*                {product.item !== 'HAT' && (*/}
                                {/*                    <>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="XS"*/}
                                {/*                                name={`products.${index}.quantityOfXS` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="SM"*/}
                                {/*                                name={`products.${index}.quantityOfSM` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="MD"*/}
                                {/*                                name={`products.${index}.quantityOfMD` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="LG"*/}
                                {/*                                name={`products.${index}.quantityOfLG` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="XL"*/}
                                {/*                                name={`products.${index}.quantityOfXL` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="2XL"*/}
                                {/*                                name={`products.${index}.quantityOf2XL` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="3XL"*/}
                                {/*                                name={`products.${index}.quantityOf3XL` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                        <TableCell>*/}
                                {/*                            <InputField*/}
                                {/*                                form={form}*/}
                                {/*                                label="4XL"*/}
                                {/*                                name={`products.${index}.quantityOf4XL` as const}*/}
                                {/*                                type="number"*/}
                                {/*                                defaultValue="0"*/}
                                {/*                                variant="bordered"*/}
                                {/*                                size="sm"*/}
                                {/*                                labelPlacement="outside"*/}
                                {/*                            />*/}
                                {/*                        </TableCell>*/}
                                {/*                    </>*/}
                                {/*                )}*/}
                                {/*                <TableCell>*/}
                                {/*                    <InputField*/}
                                {/*                        isReadOnly={product.item !== 'HAT'}*/}
                                {/*                        form={form}*/}
                                {/*                        label={product.item !== 'HAT' ? 'TOTAL' : 'QUANTITY'}*/}
                                {/*                        name={`products.${index}.totalQuantity` as const}*/}
                                {/*                        type="number"*/}
                                {/*                        variant="bordered"*/}
                                {/*                        size="sm"*/}
                                {/*                        labelPlacement="outside"*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*                <TableCell>*/}
                                {/*                    <InputField*/}
                                {/*                        form={form}*/}
                                {/*                        label="NOTES"*/}
                                {/*                        name={`products.${index}.notes` as const}*/}
                                {/*                        placeholder=" "*/}
                                {/*                        variant="bordered"*/}
                                {/*                        size="sm"*/}
                                {/*                        labelPlacement="outside"*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*                <TableCell>*/}
                                {/*                    <InputField*/}
                                {/*                        form={form}*/}
                                {/*                        label="UNIT PRICE"*/}
                                {/*                        name={`products.${index}.unitPrice` as const}*/}
                                {/*                        type="number"*/}
                                {/*                        variant="bordered"*/}
                                {/*                        size="sm"*/}
                                {/*                        labelPlacement="outside"*/}
                                {/*                        startContent={*/}
                                {/*                            <div className="pointer-events-none flex items-center">*/}
                                {/*                                <p className="text-small">*/}
                                {/*                                    $*/}
                                {/*                                </p>*/}
                                {/*                            </div>*/}
                                {/*                        }*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*                <TableCell>*/}
                                {/*                    <InputField*/}
                                {/*                        isReadOnly*/}
                                {/*                        form={form}*/}
                                {/*                        label="SUBTOTAL"*/}
                                {/*                        name={`products.${index}.subtotal` as const}*/}
                                {/*                        type="number"*/}
                                {/*                        variant="bordered"*/}
                                {/*                        size="sm"*/}
                                {/*                        labelPlacement="outside"*/}
                                {/*                        startContent={*/}
                                {/*                            <div className="pointer-events-none flex items-center">*/}
                                {/*                                <p className="text-small">*/}
                                {/*                                    $*/}
                                {/*                                </p>*/}
                                {/*                            </div>*/}
                                {/*                        }*/}
                                {/*                    />*/}
                                {/*                </TableCell>*/}
                                {/*            </TableRow>*/}
                                {/*        ))}*/}
                                {/*    </TableBody>*/}
                                {/*</Table>*/}
                            </Card>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardFooter className="justify-end w-full">
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
                            <Button type="submit" variant="solid" color="primary">
                                Submit
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
