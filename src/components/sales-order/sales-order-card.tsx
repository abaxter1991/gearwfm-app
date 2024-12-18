'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiArrowDownTray, HiPencilSquare } from 'react-icons/hi2'
import { AuthorizeStatusModal } from '~/components/sales-order/authorize-status-modal'
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

    const iconClasses = 'pointer-events-none shrink-0 text-xl text-black'

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
                    <div className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-brand-primary to-cyan-400 p-2 text-black shadow-md">
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="truncate text-2xl">{salesOrder.companyName}</h1>
                            <p className="truncate text-sm text-zinc-800">REF#: {salesOrder.referenceId}</p>
                            <p className="truncate text-sm text-zinc-800">Sales Rep: {salesOrder.salesRepName}</p>
                        </div>
                        <div className="flex min-w-44 max-w-44 flex-col overflow-hidden">
                            <div className="flex flex-nowrap items-center gap-2">
                                <p className="text-nowrap text-small">Order Date:</p>
                                <p className="text-lg">{formatDateString(String(salesOrder.orderDate))}</p>
                            </div>
                            <div className="flex flex-nowrap items-center gap-2">
                                <p className="text-nowrap text-small">Due Date:</p>
                                <p className="text-xl font-bold">{formatDateString(String(salesOrder.dueDate))}</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute right-0 top-0 p-2">
                        <SalesOrderOptionsMenu
                            salesOrderId={salesOrder.id}
                            onDelete={() => {
                                router.refresh()
                            }}
                        />
                    </div>
                </CardHeader>
                <CardBody className="justify-between pt-0">
                    <div className="flex justify-between gap-2">
                        <div className="flex w-1/2 flex-col">
                            <div className="flex w-full justify-between">
                                <p>
                                    Status:
                                </p>
                                <Chip
                                    size="sm"
                                    radius="sm"
                                    color="warning"
                                    className="capitalize"
                                >
                                    {salesOrder.status.replace(/_/g, ' ')}
                                </Chip>
                            </div>
                            <div className="flex w-full justify-between">
                                <p>
                                    SO#:
                                </p>
                                <p>
                                    {salesOrder.externalId}
                                </p>
                            </div>
                            <div className="flex w-full justify-between pb-3">
                                <p>
                                    Shipped Date:
                                </p>
                                <p>
                                    N/A
                                </p>
                            </div>
                            <Divider />
                            <div className="flex w-full flex-col gap-3 pt-3">
                                <div className="flex flex-col">
                                    <p className="text-xs uppercase text-default-500">
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
                                    <p className="text-xs uppercase text-default-500">
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
                                    <p className="text-xs uppercase text-default-500">
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
                        </div>
                        <div className="flex w-1/2 flex-col gap-2">
                            <Textarea
                                isReadOnly
                                label="NOTES"
                                value={salesOrder.notes || ''}
                                disableAutosize={true}
                                className="w-full"
                                classNames={{
                                    input: 'resize-y h-40 min-h-5',
                                }}
                            />
                            <Textarea
                                isReadOnly
                                label="TRACKING #"
                                value={salesOrder.trackingNumber || ''}
                                disableAutosize={true}
                                className="w-full"
                                classNames={{
                                    input: 'resize-y h-full min-h-5',
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs uppercase text-default-500">
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
                <Divider/>
                <CardFooter className="justify-between">
                    <AuthorizeStatusModal salesOrder={salesOrder} mutate={mutate} />
                    <div className="flex justify-end gap-2">
                        <Button
                            size="sm"
                            onPress={handleDownloadOrder}
                            className="w-28 bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                            startContent={<HiArrowDownTray className={iconClasses}/>}
                        >
                            Download
                        </Button>
                        <Button
                            size="sm"
                            onPress={() => router.push(`/sales-orders/${salesOrderId}`)}
                            className="w-28 bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                            startContent={<HiPencilSquare className={iconClasses}/>}
                        >
                            View Order
                        </Button>
                        <SalesOrderProofModal salesOrder={salesOrder}/>
                    </div>
                </CardFooter>
            </Card>
        )
    )
}
