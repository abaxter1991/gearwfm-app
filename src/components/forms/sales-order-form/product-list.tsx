'use client'

import {
    Button,
    Card, CardBody,
    Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
    Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Select, SelectItem, useDisclosure,
} from '@nextui-org/react'
import axios from 'axios'
import { useFieldArray, useWatch } from 'react-hook-form'
import { HiTrash } from 'react-icons/hi2'
import { FileUpload } from '~/components/common/file-upload'
import { InputField, NumberInputField, TextAreaField } from '~/components/forms/fields'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { productCategories } from '~/lib/constants/product-categories'
import { defaultSalesOrderProduct } from './index'
import type { SalesOrderFormSchema } from './index'
import type { UseFormReturn } from 'react-hook-form'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type Props = {
    form: UseFormReturn<SalesOrderFormSchema, undefined>
}

export function ProductList({ form }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

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

    return (
        <>
            {products.length > 0 && (
                <Card>
                    <CardBody className="gap-4">
                        {products.map((product, index) => (
                            <div
                                key={product.rhfId}
                                className="flex w-full gap-4 border-b-zinc-300 dark:border-b-black"
                            >
                                <div className="flex w-[25px] flex-none items-center justify-center">
                                    {index + 1}
                                </div>
                                <div className="w-[90px] flex-none">
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
                                                            <SelectItem
                                                                key={item.key}
                                                                textValue={item.key}
                                                            >
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
                                            ),
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
                                        <HiTrash className="size-4"/>
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
                                                            Deleting this product from the sales order is
                                                            permanent and cannot be undone,
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
                                                            className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
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
            </div>
        </>
    )
}
