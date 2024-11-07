'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import { CsvReader } from '~/components/common/csv-reader'

const djangoApiBaseUrl = process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL

async function parseCsvData(csvData: any) {
    const data = JSON.stringify(csvData)
    const response = await axios.post(`${djangoApiBaseUrl}/products/import/parse`, { data })
    return response.data
}

type Props = {
    onImport?: (data: any) => void
}

export function SalesOrderImportModal({ onImport }: Props) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [importedData, setImportedData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

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
                                        setIsLoading(true)
                                        const cleanedData = await parseCsvData(csvData)
                                        setImportedData(cleanedData)
                                        setIsLoading(false)
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="light"
                                    color="danger"
                                    size="sm"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    isDisabled={importedData.length === 0}
                                    color="primary"
                                    size="sm"
                                    className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                                    onPress={() => {
                                        if (onImport) {
                                            onImport(importedData)
                                        }

                                        onClose()
                                    }}
                                >
                                    {isLoading ? 'Loading...' : 'Import'}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
