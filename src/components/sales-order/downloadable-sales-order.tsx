import { Card, CardBody, CardHeader, Checkbox, Input, Textarea } from '@nextui-org/react'
import Image from 'next/image'
import { type SalesOrderAndRelations } from '~/types'

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

type Props = {
    salesOrder: SalesOrderAndRelations
}

export async function DownloadableSalesOrder({ salesOrder }: Props) {
    return (
        <div className="flex size-full flex-col gap-4">
            <Card className="shrink-0">
                <CardHeader className="w-full justify-center bg-brand-primary text-black">
                    <h1 className="text-2xl font-bold">Sales Order Form</h1>
                </CardHeader>
                <CardBody className="gap-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <Input
                                    isReadOnly
                                    defaultValue={String(salesOrder.orderDate)}
                                    label="ORDER DATE"
                                    variant="bordered"
                                    size="sm"
                                />
                                <Input
                                    isReadOnly
                                    defaultValue={String(salesOrder.dueDate)}
                                    label="DUE DATE"
                                    variant="bordered"
                                    size="sm"
                                />
                                <Input
                                    isReadOnly
                                    value={String(salesOrder.referenceId)}
                                    label="REFERENCE #"
                                    placeholder=" "
                                    variant="bordered"
                                    size="sm"
                                    className="w-full"
                                />
                            </div>
                            <Input
                                isReadOnly
                                value={String(salesOrder.salesRepName)}
                                label="SALES REP NAME"
                                placeholder=" "
                                isRequired={true}
                                variant="bordered"
                                size="sm"
                            />
                            <Input
                                isReadOnly
                                value={String(salesOrder.salesRepEmailAddress)}
                                label="SALES REP EMAIL ADDRESS"
                                placeholder=" "
                                variant="bordered"
                                size="sm"
                            />
                            <div className="flex flex-col gap-2">
                                <Checkbox
                                    isReadOnly
                                    value={String(salesOrder.isNewCustomer)}
                                    size="sm"
                                >
                                    NEW CUSTOMER
                                </Checkbox>
                                <p className="text-small text-default-500">*If customer already exists, then leave this unchecked.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Input
                                isReadOnly
                                label="COMPANY NAME"
                                value={String(salesOrder.companyName)}
                                placeholder=" "
                                isRequired={true}
                                variant="bordered"
                                size="sm"
                            />
                            <Input
                                isReadOnly
                                label="CONTACT NAME"
                                value={String(salesOrder.contactName)}
                                placeholder=" "
                                variant="bordered"
                                size="sm"
                            />
                            <Input
                                isReadOnly
                                label="PHONE NUMBER"
                                value={String(salesOrder.phoneNumber)}
                                placeholder=" "
                                variant="bordered"
                                size="sm"
                            />
                            <Input
                                isReadOnly
                                label="EMAIL ADDRESS"
                                value={String(salesOrder.emailAddress)}
                                placeholder=" "
                                variant="bordered"
                                size="sm"
                            />
                        </div>
                        <div className="space-y-4">
                            <Input
                                isReadOnly
                                label="SHIPPING ADDRESS"
                                value={String(salesOrder.shippingAddress)}
                                placeholder=" "
                                variant="bordered"
                                size="sm"
                            />
                            <Input
                                isReadOnly
                                label="BILLING ADDRESS"
                                value={String(salesOrder.billingAddress)}
                                placeholder=" "
                                variant="bordered"
                                size="sm"
                            />
                            <Textarea
                                isReadOnly
                                label="NOTES"
                                value={String(salesOrder.notes)}
                                placeholder=" "
                                variant="bordered"
                                size="sm"
                                maxRows={3}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
            {salesOrder.products.length > 0 && (
                <Card>
                    <CardBody className="gap-4">
                        {salesOrder.products.map((product, index) => (
                            <div
                                key={product.id}
                                className="flex w-full gap-4 border-b-zinc-300 dark:border-b-black"
                            >
                                <div className="w-[75px] flex-none">
                                    <Input
                                        isReadOnly
                                        label="ITEM"
                                        value={String(product.item)}
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <div className="w-[150px] flex-none">
                                    <Input
                                        isReadOnly
                                        label="FILE NAME"
                                        value={String(product.fileName)}
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <div className="min-w-[100px] max-w-[150px] flex-auto">
                                    <Input
                                        isReadOnly
                                        label="STYLE"
                                        value={String(product.style)}
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <div className="min-w-[100px] max-w-[150px] flex-auto">
                                    <Input
                                        isReadOnly
                                        label="COLOR"
                                        value={String(product.color)}
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <div className="w-[75px] flex-none">
                                    <p className="pb-1.5 text-tiny">MOCK UP</p>
                                    <div className="relative size-8">
                                        <Image
                                            src={product.mockupImageUrl}
                                            alt="Mockup Image"
                                            className="object-contain"
                                            fill
                                        />
                                    </div>
                                </div>
                                <div className="w-full min-w-[150px] flex-auto">
                                    {/*<Textarea*/}
                                    {/*   */}
                                    {/*    label="NOTES"*/}
                                    {/*    String(value{product.notes` a)}
                                    {/*    placeholder=" "*/}
                                    {/*    variant="bordered"*/}
                                    {/*    size="sm"*/}
                                    {/*    labelPlacement="outside"*/}
                                    {/*    maxRows={1}*/}
                                    {/*/>*/}
                                    <Input
                                        isReadOnly
                                        label="NOTES"
                                        value={String(product.notes)}
                                        placeholder=" "
                                        variant="bordered"
                                        size="sm"
                                        labelPlacement="outside"
                                    />
                                </div>
                                {product.item && getFieldLayout(product.item) === 'Tees' && (
                                    <div className="flex gap-4">
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="XS"
                                                value={String(product.quantityOfXS)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="SM"
                                                value={String(product.quantityOfSM)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="MD"
                                                value={String(product.quantityOfMD)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="LG"
                                                value={String(product.quantityOfLG)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="XL"
                                                value={String(product.quantityOfXL)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="2XL"
                                                value={String(product.quantityOf2XL)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="3XL"
                                                value={String(product.quantityOf3XL)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                        <div className="w-[50px] flex-auto">
                                            <Input
                                                isReadOnly
                                                label="4XL"
                                                value={String(product.quantityOf4XL)}
                                                type="text"
                                                defaultValue="0"
                                                variant="bordered"
                                                size="sm"
                                                labelPlacement="outside"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="w-[75px] shrink-0">
                                    <Input
                                        isReadOnly
                                        label={product.item && getFieldLayout(product.item) !== 'Gear' ? 'TOTAL' : 'QUANTITY'}
                                        value={String(product.totalQuantity)}
                                        type="text"
                                        variant="bordered"
                                        size="sm"
                                        labelPlacement="outside"
                                    />
                                </div>
                                <div className="w-[75px] shrink-0">
                                    <Input
                                        isReadOnly
                                        label="UNIT PRICE"
                                        value={String(product.unitPrice)}
                                        type="text"
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
                                <div className="w-[75px] shrink-0">
                                    <Input
                                        isReadOnly
                                        label="SUBTOTAL"
                                        value={String(product.subtotal)}
                                        type="text"
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
                            </div>
                        ))}
                    </CardBody>
                </Card>
            )}
            <Card className="shrink-0">
                <CardBody className="w-full flex-row justify-end">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium">DISCOUNT</p>
                            <Input
                                isReadOnly
                                name="discount"
                                type="text"
                                variant="bordered"
                                size="sm"
                                labelPlacement="outside-left"
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <p className="text-small">%</p>
                                    </div>
                                }
                            />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium">SHIPPING COST</p>
                            <Input
                                isReadOnly
                                name="shippingPrice"
                                type="text"
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
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium">GRAND TOTAL</p>
                            <Input
                                isReadOnly
                                name="grandTotal"
                                type="text"
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
                </CardBody>
            </Card>
        </div>
    )
}
