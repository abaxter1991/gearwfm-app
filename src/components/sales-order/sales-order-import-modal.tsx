'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { CsvReader } from '~/components/common/csv-reader'

const djangoApiBaseUrl = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL

async function parseCsvData(csvData: any) {
    const data = JSON.stringify(csvData)
    const response = await axios.post(`${djangoApiBaseUrl}/products/import/parse`, { data })
    console.log({ responseData: response.data })
    return response.data
}

type Props = {
    onImport?: (data: any) => void
}

export function SalesOrderImportModal({ onImport }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
                                    onCsvLoaded={async (csvData) => {
                                        const cleanedData = await parseCsvData(csvData)
                                        setImportedData(cleanedData)
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
                                    isDisabled={importedData.length === 0}
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
