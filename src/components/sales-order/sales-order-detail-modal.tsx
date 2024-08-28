'use client'

import { SalesOrderForm } from '@/components/forms/sales-order-form'
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import type { SalesOrderAndRelations } from '@/types'

type Props = {
    salesOrder: SalesOrderAndRelations
    mutate?: any
}

export function SalesOrderDetailModal({ salesOrder, mutate }: Props) {
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
                                <SalesOrderForm salesOrder={salesOrder} mutate={mutate} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
