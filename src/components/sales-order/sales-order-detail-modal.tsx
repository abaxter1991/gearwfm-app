'use client'

import { SalesOrderForm } from '@/components/forms/sales-order-form'
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import type { SalesOrder, SalesOrderProduct, SalesOrderAssembledProduct } from '@prisma/client'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function SalesOrderDetailModal({ salesOrder }: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-brand-primary text-black"
            >
                View Order
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="full"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-6">
                                <SalesOrderForm salesOrder={salesOrder} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
