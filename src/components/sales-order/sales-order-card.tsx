'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiArrowDownTray, HiPencilSquare } from 'react-icons/hi2'
import { SalesOrderProofModal } from '~/components/sales-order/sales-order-proof-modal'
import { updateSalesOrderApprovedProof, updateSalesOrderAssembledProduct, updateSalesOrderPartsOrdered, updateSalesOrderProductsCounted, updateSalesOrderProductsShipped, updateSalesOrderPartsReceived } from '~/lib/actions'
import { sortedCategoryKeys } from '~/lib/constants/product-categories'
import { pusherClient } from '~/lib/pusher'
import { useSalesOrder } from '~/lib/queries'
import { downloadUrl } from '~/lib/utils'
import { CustomCheckbox } from './custom-checkbox'
import { SalesOrderOptionsMenu } from './sales-order-options-menu'
import type { SalesOrderAssembledProduct } from '@prisma/client'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type Props = {
    salesOrderId: string
}

export function SalesOrderCard({ salesOrderId }: Props) {
    const { data: salesOrder, mutate } = useSalesOrder(salesOrderId)
    const router = useRouter()

    const [assembledProducts, setAssembledProducts] = useState<SalesOrderAssembledProduct[]>([])

    const iconClasses = 'text-xl text-black pointer-events-none flex-shrink-0'

    function formatDateString(dateString: string) {
        const date = new Date(dateString)
        return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
    }

    function getTotalForCategory(category: string) {
        if (salesOrder) {
            return salesOrder.products
                .filter((product) => product.item === category)
                .reduce((sum, product) => sum + product.totalQuantity, 0)
        }
    }

    async function handleDownloadOrder() {
        downloadUrl(
            `${apiBaseUrl}/sales-order/${salesOrderId}/download`,
            'gear-wfm-sales-order.pdf',
        )
    }

    useEffect(() => {
        pusherClient
            .subscribe(salesOrderId)
            .bind('sales-order-updated', async () => mutate())

        return () => {
            pusherClient.unsubscribe(salesOrderId)
        }
    }, [])

    useEffect(() => {
        if (salesOrder) {
            const sortedAssembledProducts: SalesOrderAssembledProduct[] = []

            sortedCategoryKeys.forEach((categoryKey) => {
                const foundAssembledProduct = salesOrder.assembledProducts.find((assembledProduct) => assembledProduct.item === categoryKey)

                if (foundAssembledProduct) {
                    sortedAssembledProducts.push(foundAssembledProduct)
                }
            })

            setAssembledProducts(sortedAssembledProducts)
        }
    }, [salesOrder])

    return (
        salesOrder && (
            <Card className="h-[525px] w-full justify-self-center">
                <CardHeader className="flex flex-col gap-1">
                    <h1 className="text-2xl">{salesOrder.companyName}</h1>
                    <p className="text-sm">SO#: {salesOrder.externalId}</p>
                    <p className="text-sm">Reference #: {salesOrder.referenceId}</p>
                    <div className="absolute right-0 top-0 p-2">
                        <SalesOrderOptionsMenu
                            salesOrderId={salesOrder.id}
                            onDelete={() => {
                                router.refresh()
                            }}
                        />
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody className="gap-1.5">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <p className="font-bold">Due Date</p>
                            <p>{formatDateString(String(salesOrder.dueDate))}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-bold">Sales Rep</p>
                            <p>{salesOrder.salesRepName}</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex w-1/2 flex-col gap-3">
                            <div className="flex flex-col">
                                <p className="text-medium text-default-500">
                                    Approvals
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <CustomCheckbox
                                        color="success"
                                        size="sm"
                                        isSelected={salesOrder.approvedProof}
                                        onUpdate={async () => {
                                            await updateSalesOrderApprovedProof(salesOrder.id, !salesOrder.approvedProof)
                                        }}
                                    >
                                        Proof
                                    </CustomCheckbox>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-medium text-default-500">
                                    Inventory & Parts
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <CustomCheckbox
                                        color="success"
                                        size="sm"
                                        isSelected={salesOrder.partsOrdered}
                                        onUpdate={async () => {
                                            await updateSalesOrderPartsOrdered(salesOrder.id, !salesOrder.partsOrdered)
                                        }}
                                    >
                                        Ordered
                                    </CustomCheckbox>
                                    <CustomCheckbox
                                        color="success"
                                        size="sm"
                                        isSelected={salesOrder.partsReceived}
                                        onUpdate={async () => {
                                            await updateSalesOrderPartsReceived(salesOrder.id, !salesOrder.partsReceived)
                                        }}
                                    >
                                        Received
                                    </CustomCheckbox>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-medium text-default-500">
                                    Shipping
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <CustomCheckbox
                                        color="success"
                                        size="sm"
                                        isSelected={salesOrder.productsCounted}
                                        onUpdate={async () => {
                                            await updateSalesOrderProductsCounted(salesOrder.id, !salesOrder.productsCounted)
                                        }}
                                    >
                                        Counted
                                    </CustomCheckbox>
                                    <CustomCheckbox
                                        color="success"
                                        size="sm"
                                        isSelected={salesOrder.productsShipped}
                                        onUpdate={async () => {
                                            await updateSalesOrderProductsShipped(salesOrder.id, !salesOrder.productsShipped)
                                        }}
                                    >
                                        Shipped
                                    </CustomCheckbox>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-1/2 flex-col gap-2">
                            <Textarea
                                isReadOnly
                                label="NOTES"
                                value={salesOrder.notes || ''}
                                minRows={5}
                                maxRows={5}
                                className="w-full"
                            />
                            <Textarea
                                isReadOnly
                                label="TRACKING #"
                                value={salesOrder.trackingNumber || ''}
                                minRows={1}
                                maxRows={1}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-medium text-default-500">
                            Assembled Products
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {assembledProducts.map((assembledProduct) => (
                                <CustomCheckbox
                                    key={assembledProduct.id}
                                    color="success"
                                    size="sm"
                                    isSelected={assembledProduct.allAssembled}
                                    onUpdate={async () => {
                                        await updateSalesOrderAssembledProduct(salesOrder.id, assembledProduct.id, !assembledProduct.allAssembled)
                                    }}
                                    className="h-10"
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="mb-0.5 border-b border-success-foreground">
                                            {assembledProduct.item}
                                        </p>
                                        <p>
                                            {getTotalForCategory(assembledProduct.item)}
                                        </p>
                                    </div>
                                </CustomCheckbox>
                            ))}
                        </div>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className="justify-end gap-4">
                    <Button
                        size="sm"
                        onPress={handleDownloadOrder}
                        className="w-28 bg-brand-primary text-black"
                        startContent={<HiArrowDownTray className={iconClasses} />}
                    >
                        Download
                    </Button>
                    <Button
                        size="sm"
                        onPress={() => router.push(`/sales-orders/${salesOrderId}`)}
                        className="w-28 bg-brand-primary text-black"
                        startContent={<HiPencilSquare className={iconClasses} />}
                    >
                        View Order
                    </Button>
                    <SalesOrderProofModal salesOrder={salesOrder} />
                </CardFooter>
            </Card>
        )
    )
}
