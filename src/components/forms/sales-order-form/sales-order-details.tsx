'use client'

import { Card, CardBody, CardHeader } from '@heroui/react'
import { CheckboxField, DatePickerField, InputField, TextAreaField } from '~/components/forms/fields'
import type { SalesOrderFormSchema } from './index'
import type { UseFormReturn } from 'react-hook-form'
import type { SalesOrderAndRelations } from '~/types'

type Props = {
    form: UseFormReturn<SalesOrderFormSchema, undefined>
    salesOrder: SalesOrderAndRelations | undefined
}

export function SalesOrderDetails({ form, salesOrder }: Props) {
    return (
        <Card className="shrink-0">
            <CardHeader className="w-full justify-between bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md">
                <div />
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
                    </div>
                ) : (
                    <div />
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
    )
}