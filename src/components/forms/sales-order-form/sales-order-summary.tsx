import { Card, CardBody } from '@nextui-org/react'
import { NumberInputField } from '~/components/forms/fields'
import type { SalesOrderFormSchema } from './index'
import type { ReactNode } from 'react'
import type { UseFormReturn } from 'react-hook-form'

type Props = {
    form: UseFormReturn<SalesOrderFormSchema, undefined>
    actionButtons: ReactNode
}

export function SalesOrderSummary({ form, actionButtons }: Props) {
    return (
        <Card className="shrink-0">
            <CardBody className="w-full flex-row justify-end">
                {/*<div className="text-danger">*/}
                {/*    {String(form.formState.errors)}*/}
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
                    {actionButtons}
                </div>
            </CardBody>
        </Card>
    )
}
