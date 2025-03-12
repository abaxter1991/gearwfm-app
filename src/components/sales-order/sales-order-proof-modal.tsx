'use client'

import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, useDisclosure } from '@heroui/react'
import { useEffect, useState } from 'react'
import { HiArrowDownTray, HiOutlineCheckCircle } from 'react-icons/hi2'
import { ProductProofDetail } from './product-proof-detail'
import type { SalesOrderProduct } from '@prisma/client'
import type { SalesOrderAndRelations } from '~/types'

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function SalesOrderProofModal({ salesOrder }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [currentPage, setCurrentPage] = useState(1)
    const [productsInView, setProductsInView] = useState<SalesOrderProduct[]>([])

    const iconClasses = 'pointer-events-none shrink-0 text-xl text-black'

    const itemsPerPage = 6

    useEffect(() => {
        const start = currentPage * itemsPerPage - itemsPerPage
        const end = currentPage * itemsPerPage
        setProductsInView(salesOrder.products.slice(start, end))
    }, [currentPage])

    return (
        <>
            <Button
                size="sm"
                onPress={onOpen}
                className="w-28 bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                startContent={<HiOutlineCheckCircle className={iconClasses} />}
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
                            <ModalHeader className="flex items-center justify-between gap-1">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-2xl">{salesOrder.companyName}</h1>
                                    <p className="text-sm">Due Date: {new Date(String(salesOrder.dueDate)).toLocaleDateString()}</p>
                                </div>
                                <Button
                                    isIconOnly
                                    variant="light"
                                    size="sm"
                                    color="primary"
                                    className="border-brand-primary text-brand-primary"
                                    onPress={() => window.print()}
                                >
                                    <HiArrowDownTray className="size-6" />
                                </Button>
                            </ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div className="grid size-full grid-cols-3 grid-rows-2 place-content-between">
                                    {productsInView.map((product) => (
                                        <ProductProofDetail
                                            key={product.id}
                                            product={product}
                                        />
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
