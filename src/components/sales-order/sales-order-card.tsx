'use client'

import { useUser } from '@clerk/nextjs'
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Textarea } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiArrowDownTray, HiPencilSquare } from 'react-icons/hi2'
import { AuthorizeStatusModal } from '~/components/sales-order/authorize-status-modal'
import { SalesOrderProofModal } from '~/components/sales-order/sales-order-proof-modal'
import { toggleApprovedProof, toggleAllAssembled, togglePartsOrdered, toggleProductsCounted, toggleProductsShipped, togglePartsReceived } from '~/lib/actions'
import { sortedCategoryKeys } from '~/lib/constants/product-categories'
import { pusherClient } from '~/lib/pusher'
import { cn, downloadUrl } from '~/lib/utils'
import { CustomCheckbox } from './custom-checkbox'
import { SalesOrderOptionsMenu } from './sales-order-options-menu'
import type { SalesOrderAssembledProduct } from '@prisma/client'
import type { SalesOrderAndRelations } from '~/types'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function SalesOrderCard({ salesOrder }: Props) {
    const { user } = useUser()
    const isAdmin = user?.fullName === 'Austin Baxters' || user?.fullName === 'Shawn Baxter' || user?.fullName === 'Spencer Lambert'
    const router = useRouter()

    const [displayedSalesOrder, setDisplayedSalesOrder] = useState<SalesOrderAndRelations>()
    const [assembledProducts, setAssembledProducts] = useState<SalesOrderAssembledProduct[]>([])

    const iconClasses = 'pointer-events-none shrink-0 text-xl text-black'

    function formatDateString(dateString: string) {
        const date = new Date(dateString)
        return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
    }

    function getTotalForCategory(category: string) {
        if (displayedSalesOrder) {
            return displayedSalesOrder.products
                .filter((product) => product.item === category)
                .reduce((sum, product) => sum + product.totalQuantity, 0)
        }
    }

    async function handleDownloadOrder() {
        downloadUrl(
            `${apiBaseUrl}/sales-order/${salesOrder.id}/download`,
            'gear-wfm-sales-order.pdf',
        )
    }

    useEffect(() => {
        pusherClient
            .subscribe(salesOrder.id)
            .bind(
                'sales-order-updated',
                async (updatedSalesOrder: SalesOrderAndRelations) => {
                    const cleanedSalesOrder = {
                        ...updatedSalesOrder,
                        products: displayedSalesOrder ? displayedSalesOrder.products : salesOrder.products,
                        assembledProducts: displayedSalesOrder ? displayedSalesOrder.assembledProducts : salesOrder.assembledProducts,
                    }

                    setDisplayedSalesOrder(cleanedSalesOrder)
                },
            )
            .bind(
                'assembled-product-toggled',
                async (updatedSalesOrder: SalesOrderAndRelations) => {
                    const cleanedSalesOrder = {
                        ...updatedSalesOrder,
                        products: displayedSalesOrder ? displayedSalesOrder.products : salesOrder.products,
                        assembledProducts: updatedSalesOrder.assembledProducts,
                    }

                    setDisplayedSalesOrder(cleanedSalesOrder)
                },
            )

        return () => {
            pusherClient.unsubscribe(salesOrder.id)
        }
    }, [])

    useEffect(() => {
        if (salesOrder) {
            setDisplayedSalesOrder(salesOrder)
        }
    }, [])

    useEffect(() => {
        if (displayedSalesOrder) {
            const sortedAssembledProducts: SalesOrderAssembledProduct[] = []

            sortedCategoryKeys.forEach((categoryKey) => {
                const foundAssembledProduct = displayedSalesOrder.assembledProducts.find((assembledProduct) => assembledProduct.item === categoryKey)

                if (foundAssembledProduct) {
                    sortedAssembledProducts.push(foundAssembledProduct)
                }
            })

            setAssembledProducts(sortedAssembledProducts)
        }
    }, [displayedSalesOrder])

    const salesOrderCardClasses = cn('w-full justify-self-center', isAdmin ? 'h-[585px]' : 'h-[530px]')

    return (
        displayedSalesOrder && (
            <Card className={salesOrderCardClasses}>
                <CardHeader className="flex flex-col gap-1">
                    <div className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-brand-primary to-cyan-400 p-2 text-black shadow-md">
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="truncate text-2xl">{displayedSalesOrder.companyName}</h1>
                            <p className="truncate text-sm text-zinc-800">REF#: {displayedSalesOrder.referenceId}</p>
                            <p className="truncate text-sm text-zinc-800">Sales Rep: {displayedSalesOrder.salesRepName}</p>
                        </div>
                        <div className="flex min-w-44 max-w-44 flex-col overflow-hidden">
                            <div className="flex flex-nowrap items-center gap-2">
                                <p className="text-nowrap text-small">Order Date:</p>
                                <p className="text-lg">{formatDateString(String(displayedSalesOrder.orderDate))}</p>
                            </div>
                            <div className="flex flex-nowrap items-center gap-2">
                                <p className="text-nowrap text-small">Due Date:</p>
                                <p className="text-xl font-bold">{formatDateString(String(displayedSalesOrder.dueDate))}</p>
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
                                    {displayedSalesOrder.status.replace(/_/g, ' ')}
                                </Chip>
                            </div>
                            <div className="flex w-full justify-between">
                                <p>
                                    SO#:
                                </p>
                                <p>
                                    {displayedSalesOrder.externalId}
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
                                            isSelected={displayedSalesOrder.approvedProof}
                                            onUpdate={async () => {
                                                await toggleApprovedProof(salesOrder.id, !displayedSalesOrder.approvedProof)
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
                                            isSelected={displayedSalesOrder.partsOrdered}
                                            onUpdate={async () => {
                                                await togglePartsOrdered(salesOrder.id, !displayedSalesOrder.partsOrdered)
                                            }}
                                        >
                                            Ordered
                                        </CustomCheckbox>
                                        <CustomCheckbox
                                            color="success"
                                            size="sm"
                                            isSelected={displayedSalesOrder.partsReceived}
                                            onUpdate={async () => {
                                                await togglePartsReceived(salesOrder.id, !displayedSalesOrder.partsReceived)
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
                                            isSelected={displayedSalesOrder.productsCounted}
                                            onUpdate={async () => {
                                                await toggleProductsCounted(salesOrder.id, !displayedSalesOrder.productsCounted)
                                            }}
                                        >
                                            Counted
                                        </CustomCheckbox>
                                        <CustomCheckbox
                                            color="success"
                                            size="sm"
                                            isSelected={displayedSalesOrder.productsShipped}
                                            onUpdate={async () => {
                                                await toggleProductsShipped(salesOrder.id, !displayedSalesOrder.productsShipped)
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
                                value={displayedSalesOrder.notes || ''}
                                disableAutosize={true}
                                className="w-full"
                                classNames={{
                                    input: 'resize-y h-40 min-h-5',
                                }}
                            />
                            <Textarea
                                isReadOnly
                                label="TRACKING #"
                                value={displayedSalesOrder.trackingNumber || ''}
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
                                        await toggleAllAssembled(
                                            salesOrder.id,
                                            assembledProduct.id,
                                            !assembledProduct.allAssembled,
                                        )
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
                <CardFooter className="flex-col">
                    <div className="flex w-full justify-between">
                        <AuthorizeStatusModal salesOrder={displayedSalesOrder}/>
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
                                onPress={() => router.push(`/sales-orders/${salesOrder.id}`)}
                                className="w-28 bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                                startContent={<HiPencilSquare className={iconClasses}/>}
                            >
                                View Order
                            </Button>
                            <SalesOrderProofModal salesOrder={displayedSalesOrder}/>
                        </div>
                    </div>

                    {isAdmin ? (
                        <div className="flex w-full py-3">
                            <Button
                                size="sm"
                                // onPress={handleDownloadOrder}
                                className="w-full bg-success text-base font-bold text-black shadow-md"
                            >
                                {Number(salesOrder.grandTotal).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}
                            </Button>
                        </div>
                    ) : null}
                </CardFooter>
            </Card>
        )
    )
}
