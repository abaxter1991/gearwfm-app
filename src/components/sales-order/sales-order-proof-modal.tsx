'use client'

import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    useDisclosure,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { ProductProofDetail } from './product-proof-detail'
import { HiArrowDownTray } from 'react-icons/hi2'
import type { SalesOrder, SalesOrderProduct, SalesOrderAssembledProduct } from '@prisma/client'

export type SalesOrderAndRelations = SalesOrder & {
    products: SalesOrderProduct[]
    assembledProducts: SalesOrderAssembledProduct[]
}

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function SalesOrderProofModal({ salesOrder }: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const [currentPage, setCurrentPage] = useState(1)
    // const [productsInGroup, setProductsInGroup] = useState<SalesOrderProduct[]>([])
    const [productsInView, setProductsInView] = useState<SalesOrderProduct[]>([])

    const itemsPerPage = 6

    useEffect(() => {
        const start = (currentPage * itemsPerPage) - itemsPerPage
        const end = currentPage * itemsPerPage
        setProductsInView(salesOrder.products.slice(start, end))
    }, [currentPage])

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-brand-primary text-black"
            >
                View Proof
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                className="max-w-7xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-1 items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-2xl">
                                        {salesOrder.companyName}
                                    </h1>
                                    <p className="text-sm">
                                        Due Date: {salesOrder.dueDate.toLocaleDateString()}
                                    </p>
                                </div>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    color="primary"
                                    className="border-brand-primary text-brand-primary"
                                >
                                    <HiArrowDownTray className="size-6" />
                                </Button>
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="grid grid-cols-3 grid-rows-2 h-full w-full place-content-between">
                                    {productsInView.map((product) => (
                                        <ProductProofDetail key={product.id} product={product} />
                                    ))}
                                </div>
                            </ModalBody>
                            <Divider />
                            <ModalFooter className="justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    total={Math.ceil(salesOrder.products.length / itemsPerPage)}
                                    page={currentPage}
                                    onChange={setCurrentPage}
                                    classNames={{
                                        cursor: 'bg-brand-primary',
                                    }}
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
