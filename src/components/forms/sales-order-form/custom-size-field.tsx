'use client'

import { Checkbox } from '@heroui/react'
import { useEffect } from 'react'
import { SizeInputField } from '~/components/forms/fields'
import { togglePartSizeReceived } from '~/lib/actions'
import { pusherClient } from '~/lib/pusher'
import { useSalesOrderProduct } from '~/lib/queries'
import type { SalesOrderFormSchema } from './index'
import type { UseFormReturn } from 'react-hook-form'
import type { SizeField } from '~/types'

type Props = {
    form: UseFormReturn<SalesOrderFormSchema, undefined>
    salesOrderId: string
    productId: string
    sizeField: SizeField
    index: number
}

export function CustomSizeField({ form, salesOrderId, productId, sizeField, index }: Props) {
    const { data: product, mutate } = useSalesOrderProduct(productId)

    useEffect(() => {
        const pusherChannel = `${salesOrderId}-${productId}-${sizeField.receivedFieldName}`

        pusherClient
            .subscribe(pusherChannel)
            .bind('product-received-updated', async () => mutate())

        return () => {
            pusherClient.unsubscribe(productId)
        }
    }, [])

    return (
        product && (
            <SizeInputField
                preventValueChangeOnScroll
                form={form}
                label={sizeField.label}
                name={`products.${index}.${sizeField.name}` as const}
                variant="bordered"
                size="sm"
                labelPlacement="outside"
                min={0}
                checkboxContent={(
                    <Checkbox
                        name={`products.${index}.${sizeField.receivedFieldName}` as const}
                        size="sm"
                        color="danger"
                        classNames={{
                            base: 'p-0',
                            wrapper: 'm-0',
                        }}
                        isSelected={product[sizeField.receivedFieldName]}
                        onChange={async () => {
                            await togglePartSizeReceived(salesOrderId, productId, sizeField.receivedFieldName, !product[sizeField.receivedFieldName])
                        }}
                    />
                )}
            />
        )
    )
}
