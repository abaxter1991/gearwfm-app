import { Button, Chip, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import type { KeyedMutator } from 'swr'
import type { SalesOrderAndRelations } from '~/types'

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type Props = {
    salesOrder: SalesOrderAndRelations
    mutate: KeyedMutator<SalesOrderAndRelations>
}

export function AuthorizeStatusModal({ salesOrder, mutate }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [isLoading, setIsLoading] = useState(false)
    const [statusPressed, setStatusPressed] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const statuses = [
        { name: 'Draft', key: 'DRAFT' },
        { name: 'Pending', key: 'PENDING' },
        { name: 'In Progress', key: 'IN_PROGRESS' },
        { name: 'Completed', key: 'COMPLETED' },
    ]

    async function handleStatusUpdate(newStatus: string) {
        setIsLoading(true)
        return await axios.put(`${apiBaseUrl}/sales-order/${salesOrder.id}/status`, { status: newStatus })
    }

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
                            <ModalHeader className="flex items-center justify-between gap-1">
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
                                    <p>{salesOrder.companyName} currently has a status of {salesOrder.status}.</p>
                                    <p>You can change this status by clicking on one of the available statuses below.</p>
                                    {errorMessage && (
                                        <p className="pt-8 text-danger">
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>
                            </ModalBody>
                            <Divider/>
                            <ModalFooter className="justify-center gap-2">
                                {statuses.map((status) => (
                                    <Button
                                        key={status.key}
                                        size="sm"
                                        isDisabled={status.key === salesOrder.status || isLoading}
                                        isLoading={status.key === statusPressed && isLoading}
                                        onPress={async () => {
                                            setStatusPressed(status.key)

                                            const response = await handleStatusUpdate(status.key)

                                            if (response.status === 200) {
                                                setIsLoading(false)
                                                mutate()
                                                onClose()
                                            } else {
                                                setIsLoading(false)
                                                setErrorMessage('Something went wrong. Try again later or let the developer team know about this issue.')
                                            }
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
    )
}
