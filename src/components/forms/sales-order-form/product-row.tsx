import {
    Button,
    Select, SelectItem,
} from '@nextui-org/react'
import { HiTrash } from 'react-icons/hi2'
import { FileUpload } from '~/components/common/file-upload'
import { InputField, NumberInputField, TextAreaField } from '~/components/forms/fields'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { productCategories } from '~/lib/constants/product-categories'
import { CustomSizeField } from './custom-size-field'
import type { SalesOrderFormSchema } from './index'
import type { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import type { SizeFields, SalesOrderAndRelations } from '~/types'

const isProduction = process.env.NEXT_PUBLIC_ENV === 'production'

type Props = {
    form: UseFormReturn<SalesOrderFormSchema, undefined>
    salesOrder: SalesOrderAndRelations | undefined
    product: FieldArrayWithId<SalesOrderFormSchema, 'products'>
    index: number
    getSizeFields: (index: number) => SizeFields | never[]
    isOneSizeFitsAll: (key: string) => boolean
    handleRemoveProduct: (productId: string, index: number) => void
}

export function ProductRow({ form, salesOrder, product, index, getSizeFields, isOneSizeFitsAll, handleRemoveProduct }: Props) {
    return (
        <div className="flex w-full gap-4 border-b-zinc-300 dark:border-b-black">
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
                {Object.values(getSizeFields(index)).length === 0 ? (
                    <div className="flex w-[712px] flex-auto items-center justify-center">
                        Select an item to add quantities for this product!
                    </div>
                ) : (
                    Object.values(getSizeFields(index)).map((sizeField) =>
                        sizeField.show ? (
                            <div
                                key={`${index}-${sizeField.label}`}
                                className="w-[75px] flex-auto"
                            >
                                {/*TODO: Only show the checkbox if the input is greater than 0*/}
                                {/*{salesOrder && product.id && product[sizeField.name] > 0 ? (*/}
                                {salesOrder && product.id ? (
                                    <CustomSizeField
                                        form={form}
                                        salesOrderId={salesOrder.id}
                                        productId={product.id}
                                        sizeField={sizeField}
                                        index={index}
                                    />
                                ) : (
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
                                )}
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
            <div className="shrink-0 self-center">
                <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    color="danger"
                    className="text-danger"
                    onPress={async () => {
                        await handleRemoveProduct(product.id, index)
                    }}
                >
                    <HiTrash className="size-4"/>
                </Button>
                {/*<Button*/}
                {/*    isIconOnly*/}
                {/*    variant="light"*/}
                {/*    size="sm"*/}
                {/*    color="danger"*/}
                {/*    className="text-danger"*/}
                {/*    onPress={onOpen}*/}
                {/*>*/}
                {/*    /!*<HiTrash className="size-4"/>*!/*/}
                {/*    {product.id.substr(product.id.length - 4)}*/}
                {/*</Button>*/}
                {/*<Modal*/}
                {/*    isOpen={isOpen}*/}
                {/*    onOpenChange={onOpenChange}*/}
                {/*    isDismissable={false}*/}
                {/*    isKeyboardDismissDisabled={false}*/}
                {/*    hideCloseButton={true}*/}
                {/*>*/}
                {/*    <ModalContent>*/}
                {/*        {(onClose) => (*/}
                {/*            <>*/}
                {/*                <ModalHeader className="flex flex-col gap-1">*/}
                {/*                    Are you sure?*/}
                {/*                </ModalHeader>*/}
                {/*                <ModalBody>*/}
                {/*                    <p>*/}
                {/*                        Deleting this product from the sales order is*/}
                {/*                        permanent and cannot be undone,*/}
                {/*                        even if you decide to cancel editing this form.*/}
                {/*                    </p>*/}
                {/*                    <p>*/}
                {/*                        Are you sure this is what you want to do?*/}
                {/*                    </p>*/}
                {/*                    <p>*/}
                {/*                        {product.id.substr(product.id.length - 4)}*/}
                {/*                    </p>*/}
                {/*                </ModalBody>*/}
                {/*                <ModalFooter>*/}
                {/*                    <Button*/}
                {/*                        size="sm"*/}
                {/*                        color="danger"*/}
                {/*                        variant="light"*/}
                {/*                        onPress={onClose}*/}
                {/*                    >*/}
                {/*                        Cancel*/}
                {/*                    </Button>*/}
                {/*                    <Button*/}
                {/*                        size="sm"*/}
                {/*                        className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"*/}
                {/*                        onPress={async () => {*/}
                {/*                            console.log({ 'ID: ': product.id, 'RHFID: ': product.rhfId})*/}
                {/*                            await handleRemoveProduct(product.id, index)*/}
                {/*                            onClose()*/}
                {/*                        }}*/}
                {/*                    >*/}
                {/*                        Delete*/}
                {/*                    </Button>*/}
                {/*                </ModalFooter>*/}
                {/*            </>*/}
                {/*        )}*/}
                {/*    </ModalContent>*/}
                {/*</Modal>*/}
            </div>
        </div>
    )
}
