'use client'

import { CSSProperties, useState } from 'react'
import { CsvReader } from '@/components/common/csv-reader'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useCSVReader } from 'react-papaparse'
import type { SalesOrderAndRelations } from '@/types'
import type { ProductType } from '@/components/forms/sales-order-form'

type Props = {
    onImport?: (data: any) => void,
}

export function SalesOrderImportModal({ onImport }: Props) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    const [importedData, setImportedData] = useState<any>([])

    return (
        <>
            <Button
                size="sm"
                onPress={onOpen}
            >
                Import Products (CSV)
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="p-6">
                                <CsvReader
                                    onCsvLoaded={(csvData) => {
                                        setImportedData(csvData)
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    className="bg-brand-primary text-black"
                                    onPress={() => {
                                        if (onImport) {
                                            onImport(importedData)
                                        }

                                        onClose()
                                    }}
                                >
                                    Import
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
