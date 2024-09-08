'use client'

import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react'
import { SalesOrderForm } from '~/components/forms/sales-order-form'
import type { SalesOrderAndRelations } from '~/types'

type Props = {
    salesOrder: SalesOrderAndRelations
    mutate?: any
}

export function SalesOrderDetailModal({ salesOrder, mutate }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-brand-primary text-black"
            >
                View Order (Modal)
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton={true}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                placement="top-center"
                size="full"
                backdrop="blur"
                // scrollBehavior="outside"
                className="absolute h-dvh"
                // classNames={{
                //     wrapper: 'h-dvh overflow-y-scroll',
                //     base: 'h-dvh overflow-y-scroll',
                // }}
            >
                <ModalContent className="h-dvh overflow-y-scroll">
                    {(onClose) => (
                        <>
                            <ModalBody className="h-dvh overflow-y-scroll p-0">
                                <SalesOrderForm
                                    salesOrder={salesOrder}
                                    mutate={mutate}
                                    onClose={onClose}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
