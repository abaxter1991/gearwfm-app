'use client'

import { useRouter } from 'next/navigation'
import { pusherClient } from '@/lib/pusher'
import { useSalesOrder } from '@/lib/queries'
import { useEffect } from 'react'
import { SalesOrderDetailModal } from '@/components/sales-order/sales-order-detail-modal'
import { SalesOrderProofModal } from '@/components/sales-order/sales-order-proof-modal'
import {
    updateSalesOrderApprovedProof, updateSalesOrderAssembledProduct,
    updateSalesOrderPartsOrdered,
    updateSalesOrderPartsReceived,
} from '@/lib/actions'
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Divider, Textarea } from '@nextui-org/react'
import { CustomCheckbox } from './custom-checkbox'

type Props = {
    salesOrderId: string
}

export function SalesOrderCard({ salesOrderId }: Props) {
    const { data: salesOrder, mutate } = useSalesOrder(salesOrderId)

    const router = useRouter()

    function formatDateString(dateString: string) {
        const date = new Date(dateString)
        return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
    }

    useEffect(() => {
        pusherClient
            .subscribe(salesOrderId)
            .bind('sales-order-updated', async (data: any) => {
                mutate(data.salesOrder)
            })

        return () => {
            pusherClient.unsubscribe(salesOrderId)
        }
    }, [])

    return (
        salesOrder && (
            <Card className="w-[500px] aspect-square justify-self-center">
                <CardHeader className="flex flex-col gap-1">
                    <h1 className="text-2xl">
                        {salesOrder.companyName}
                    </h1>
                    <p className="text-sm">
                        SO#: {salesOrder.externalId}
                    </p>
                </CardHeader>
                <Divider />
                <CardBody className="gap-1.5">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <p className="font-bold">
                                Due Date
                            </p>
                            <p>
                                {formatDateString(String(salesOrder.dueDate))}
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-bold">
                                Sales Rep
                            </p>
                            <p>
                                {salesOrder.salesRepName}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-1 w-1/2">
                            <div className="flex flex-col gap-1">
                                <p className="text-medium text-default-500">
                                    Approvals
                                </p>
                                <Checkbox
                                    value="approvedProof"
                                    color="success"
                                    size="sm"
                                    isSelected={salesOrder.approvedProof}
                                    onValueChange={(isSelected) => {
                                        updateSalesOrderApprovedProof(salesOrder.id, isSelected)
                                    }}
                                >
                                    Proof
                                </Checkbox>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-medium text-default-500">
                                    Inventory & Parts
                                </p>
                                <Checkbox
                                    value="partsOrdered"
                                    color="success"
                                    size="sm"
                                    isSelected={salesOrder.partsOrdered}
                                    onValueChange={(isSelected) => {
                                        updateSalesOrderPartsOrdered(salesOrder.id, isSelected)
                                    }}
                                >
                                    Ordered
                                </Checkbox>
                                <Checkbox
                                    value="partsReceived"
                                    color="success"
                                    size="sm"
                                    isSelected={salesOrder.partsReceived}
                                    onValueChange={(isSelected) => {
                                        updateSalesOrderPartsReceived(salesOrder.id, isSelected)
                                    }}
                                >
                                    Received
                                </Checkbox>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 gap-2">
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
                        <div className="flex gap-2">
                            {salesOrder.assembledProducts.map((assembledProduct) => (
                                <CustomCheckbox
                                    key={assembledProduct.id}
                                    value={assembledProduct.item.toLowerCase()}
                                    color="success"
                                    size="sm"
                                    isSelected={assembledProduct.allAssembled}
                                    onValueChange={(isSelected) => {
                                        updateSalesOrderAssembledProduct(salesOrder.id, assembledProduct.id, isSelected)
                                    }}
                                >
                                    {assembledProduct.item}
                                </CustomCheckbox>
                            ))}
                        </div>
                    </div>
                </CardBody>
                <Divider/>
                <CardFooter className="justify-around">
                    <Button
                        onPress={() => router.push(`/sales-orders/${salesOrderId}`)}
                        className="bg-brand-primary text-black"
                    >
                        View Order
                    </Button>
                    {/*<SalesOrderDetailModal salesOrder={salesOrder} mutate={mutate} />*/}
                    <SalesOrderProofModal salesOrder={salesOrder} />
                </CardFooter>
            </Card>
        )
    )
}