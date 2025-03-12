'use client'

import { Button, Card, CardBody } from '@heroui/react'
import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { cn } from '~/lib/utils'
import type { DropzoneOptions } from 'react-dropzone'

type FileDropzoneProps = {
    accept?: DropzoneOptions['accept']
    onDrop?: DropzoneOptions['onDrop']
}

export function FileDropzoneField({ accept, onDrop }: FileDropzoneProps) {
    const { open, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
        maxFiles: 1,
        accept: accept,
        onDrop: onDrop,
    })

    const dropzoneBorderColor = useMemo(() => (isFocused ? 'border-primary' : isDragAccept ? 'border-success' : isDragReject ? 'border-danger' : ''), [isFocused, isDragAccept, isDragReject])

    return (
        <Card>
            <CardBody>
                <div
                    {...getRootProps({ isFocused, isDragAccept, isDragReject })}
                    className={cn('flex flex-col items-center gap-6', 'rounded-lg border border-dashed p-6 outline-0', 'transition duration-250 ease-in-out', dropzoneBorderColor)}
                >
                    <input {...getInputProps()} />
                    <p>Drag and Drop Image</p>
                    <Button
                        color="default"
                        size="sm"
                        onPress={open}
                    >
                        Select File
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
