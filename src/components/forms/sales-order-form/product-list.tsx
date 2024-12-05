'use client'

import {
    Button,
    Card, CardBody,
    Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
} from '@nextui-org/react'
import axios from 'axios'
import { useFieldArray, useWatch } from 'react-hook-form'
import { SalesOrderImportModal } from '~/components/sales-order/sales-order-import-modal'
import { productCategories } from '~/lib/constants/product-categories'
import { ProductRow } from './product-row'
import { defaultSalesOrderProduct } from './index'
import type { SalesOrderFormSchema } from './index'
import type { UseFormReturn } from 'react-hook-form'
import type { SalesOrderAndRelations } from '~/types'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type Props = {
    form: UseFormReturn<SalesOrderFormSchema, undefined>
    salesOrder: SalesOrderAndRelations | undefined
    showImportButton?: boolean
}

export function ProductList({ form, salesOrder, showImportButton }: Props) {
    const { fields: products, append, remove } = useFieldArray({
        name: 'products',
        control: form.control,
        keyName: 'rhfId'
    })

    const productsOutput = useWatch({
        name: 'products',
        control: form.control,
        defaultValue: products,
    })

    async function handleRemoveProduct(productId: string, index: number) {
        if (productId) {
            await axios.delete(`${apiBaseUrl}/product/${productId}`)
        }

        remove(index)
    }

    function getSizeFields(index: number) {
        const key = productsOutput[index]?.item

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

    return (
        <>
            {products.length > 0 && (
                <Card>
                    <CardBody className="gap-4">
                        {products.map((product, index) => (
                            <ProductRow
                                key={product.rhfId}
                                form={form}
                                salesOrder={salesOrder}
                                product={product}
                                index={index}
                                getSizeFields={getSizeFields}
                                isOneSizeFitsAll={isOneSizeFitsAll}
                                handleRemoveProduct={handleRemoveProduct}
                            />
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
                            className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
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
                {showImportButton && (
                    <SalesOrderImportModal
                        onImport={(data) => {
                            for (const product of data) {
                                append({
                                    ...defaultSalesOrderProduct,
                                    ...product,
                                })
                            }
                        }}
                    />
                )}
            </div>
        </>
    )
}
