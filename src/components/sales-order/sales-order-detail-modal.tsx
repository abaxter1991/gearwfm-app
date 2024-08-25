'use client'

import { useEffect } from 'react'
import {
    Button,
    Checkbox,
    CheckboxGroup,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from '@nextui-org/react'
import { SalesOrder, SalesOrderProduct, SalesOrderAssembledProduct } from '@prisma/client'
import {
    updateSalesOrderApprovedProof,
    updateSalesOrderPartsOrdered,
    updateSalesOrderPartsReceived,
    updateSalesOrderAssembledProduct,
} from '@/lib/actions'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function SalesOrderDetailModal({ salesOrder }: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

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
        <>
            <Button
                onPress={onOpen}
                className="bg-brand-primary text-white"
            >
                View Order
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="5xl"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h1 className="text-2xl">
                                    {salesOrder.companyName}
                                </h1>
                                <p className="text-sm">
                                    Due Date: {salesOrder.dueDate.toLocaleDateString()}
                                </p>
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between">
                                        <p className="font-bold">Sales Rep</p>
                                        <p>{salesOrder.salesRepName}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold">Customer Service Rep</p>
                                        <p>{salesOrder.customerServiceRepName}</p>
                                    </div>
                                </div>
                                <CheckboxGroup
                                    label="Approvals"
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
                                <CheckboxGroup
                                    label="Assembled Products"
                                    defaultValue={assembledDefaultValues}
                                >
                                    {salesOrder.assembledProducts.map((assembledProduct) => (
                                        <Checkbox
                                            key={assembledProduct.id}
                                            value={assembledProduct.item.toLowerCase()}
                                            color="success"
                                            onChange={(event) => {
                                                updateSalesOrderAssembledProduct(assembledProduct.id, event.target.checked)
                                            }}
                                        >
                                            {assembledProduct.item}
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                                <Textarea
                                    isReadOnly
                                    label="Notes"
                                    value={salesOrder.notes || ''}
                                />
                            </ModalBody>
                            <ModalFooter className="justify-center bg-brand-primary text-black font-bold">
                                NEW
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
