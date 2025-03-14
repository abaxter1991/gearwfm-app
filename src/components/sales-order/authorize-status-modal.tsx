import { Button, Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import { useState } from 'react'
import { changeStatus } from '~/lib/actions'
import type { SalesOrderAndRelations, SalesOrderStatusOptions } from '~/types'

type Props = {
    salesOrder: SalesOrderAndRelations
}

export function AuthorizeStatusModal({ salesOrder }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [isLoading, setIsLoading] = useState(false)
    const [statusPressed, setStatusPressed] = useState<string>('')

    const statuses: SalesOrderStatusOptions[] = [
        { name: 'Draft', key: 'DRAFT' },
        { name: 'Pending', key: 'PENDING' },
        { name: 'In Progress', key: 'IN_PROGRESS' },
        { name: 'Completed', key: 'COMPLETED' },
    ]

    return (
        <>
            <Button
                size="sm"
                onPress={onOpen}
                className="bg-gradient-to-br from-red-600 to-danger text-white shadow-md"
            >
                Authorize
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                size="5xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="items-center justify-between gap-1">
                                <h1 className="text-2xl">
                                    {salesOrder.companyName}
                                </h1>
                                <Chip
                                    size="sm"
                                    radius="sm"
                                    color="warning"
                                    className="mr-4"
                                >
                                    {salesOrder.status}
                                </Chip>
                            </ModalHeader>
                            <Divider/>
                            <ModalBody>
                                <div className="flex flex-col gap-1">
                                    <p>{salesOrder.companyName} currently has a status of {salesOrder.status.replace(/_/g, ' ')}.</p>
                                    <p>You can change this status by clicking on one of the available statuses below.</p>
                                </div>
                            </ModalBody>
                            <Divider/>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    size="sm"
                                    color="danger"
                                    variant="bordered"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                {statuses.map((status) => (
                                    <Button
                                        key={status.key}
                                        size="sm"
                                        isDisabled={status.key === salesOrder.status || isLoading}
                                        isLoading={status.key === statusPressed && isLoading}
                                        onPress={async () => {
                                            setStatusPressed(status.key)
                                            setIsLoading(true)
                                            await changeStatus(salesOrder.id, status.key)
                                            setIsLoading(false)
                                            onClose()
                                        }}
                                    >
                                        {status.name}
                                    </Button>
                                ))}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
