'use client'

import { SalesOrderDetailModal } from '@/components/sales-order/sales-order-detail-modal'
import { SalesOrderProofModal } from '@/components/sales-order/sales-order-proof-modal'
import {
    updateSalesOrderApprovedProof, updateSalesOrderAssembledProduct,
    updateSalesOrderPartsOrdered,
    updateSalesOrderPartsReceived,
} from '@/lib/actions'
import { Card, CardBody, CardFooter, CardHeader, Checkbox, CheckboxGroup, Divider, Textarea } from '@nextui-org/react'
import { CustomCheckbox } from './custom-checkbox'
import type { SalesOrder, SalesOrderProduct, SalesOrderAssembledProduct } from '@prisma/client'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function SalesOrderCard({ salesOrder }: Props) {
    const approvalDefaultValues: string[] = []
    const partsDefaultValues: string[] = []
    const assembledDefaultValues: string[] = []

    if (salesOrder.approvedProof) approvalDefaultValues.push('approvedProof')
    if (salesOrder.partsOrdered) partsDefaultValues.push('partsOrdered')
    if (salesOrder.partsReceived) partsDefaultValues.push('partsReceived')

    salesOrder.assembledProducts.forEach((product) => {
        if (product.allAssembled) assembledDefaultValues.push(product.item.toLowerCase())
    })

    return (
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
                        <p className="font-bold">Due Date</p>
                        <p>{salesOrder.dueDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-bold">Sales Rep</p>
                        <p>{salesOrder.salesRepName}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1 w-1/2">
                        <CheckboxGroup
                            label="Approvals"
                            size="sm"
                            defaultValue={approvalDefaultValues}
                        >
                            <Checkbox
                                value="approvedProof"
                                color="success"
                                onChange={(event) => {
                                    updateSalesOrderApprovedProof(salesOrder.id, event.target.checked)
                                }}
                            >
                                Proof
                            </Checkbox>
                        </CheckboxGroup>
                        <CheckboxGroup
                            label="Inventory & Parts"
                            size="sm"
                            defaultValue={partsDefaultValues}
                        >
                            <Checkbox
                                value="partsOrdered"
                                color="success"
                                onChange={(event) => {
                                    updateSalesOrderPartsOrdered(salesOrder.id, event.target.checked)
                                }}
                            >
                                Ordered
                            </Checkbox>
                            <Checkbox
                                value="partsReceived"
                                color="success"
                                onChange={(event) => {
                                    updateSalesOrderPartsReceived(salesOrder.id, event.target.checked)
                                }}
                            >
                                Received
                            </Checkbox>
                        </CheckboxGroup>
                    </div>
                    <Textarea
                        isReadOnly
                        label="Notes"
                        value={salesOrder.notes || ''}
                        maxRows={5}
                        className="w-1/2"
                    />
                </div>
                <CheckboxGroup
                    label="Assembled Products"
                    orientation="horizontal"
                    size="sm"
                    defaultValue={assembledDefaultValues}
                    className="gap-1"
                >
                    {salesOrder.assembledProducts.map((assembledProduct) => (
                        <CustomCheckbox
                            key={assembledProduct.id}
                            value={assembledProduct.item.toLowerCase()}
                            color="success"
                            onChange={(event) => {
                                updateSalesOrderAssembledProduct(assembledProduct.id, event.target.checked)
                            }}
                        >
                            {assembledProduct.item}
                        </CustomCheckbox>
                    ))}
                </CheckboxGroup>
            </CardBody>
            <Divider/>
            <CardFooter className="justify-around">
                <SalesOrderDetailModal salesOrder={salesOrder}/>
                <SalesOrderProofModal salesOrder={salesOrder}/>
            </CardFooter>
        </Card>
    )
}