'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import {
    Button,
    Checkbox,
    CheckboxGroup, Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from '@nextui-org/react'
import { SalesOrder, SalesOrderProduct, SalesOrderAssembledProduct } from '@prisma/client'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function SalesOrderProofModal({ salesOrder }: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-brand-primary text-white"
            >
                View Proof
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
                                <div className="grid grid-cols-3 grid-rows-2 h-full w-full place-content-between">
                                    {salesOrder.products.map((product) => (
                                        <div key={product.id} className="relative size-48 m-4 justify-self-center">
                                            <Image
                                                src={product.mockupImageUrl!}
                                                alt="Mockup Image"
                                                className="object-contain"
                                                fill
                                            />
                                        </div>
                                    ))}
                                </div>
                            </ModalBody>
                            <ModalFooter className="justify-center bg-success-500 text-black">
                                IN PROGRESS
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
