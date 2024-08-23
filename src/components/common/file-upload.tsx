'use client'

import { FileIcon } from 'lucide-react'
import { HiTrash } from 'react-icons/hi2'
import Image from 'next/image'
import React from 'react'
import { Button } from '@nextui-org/react'
import { UploadButton, UploadDropzone, Uploader } from '@/lib/uploadthing'

type FileUploadProps = {
    endpoint: 'mockups'
    onChange: (url?: string) => void
    value?: string
}

export function FileUpload({ endpoint, onChange, value }: FileUploadProps) {
    const type = value?.split('.').pop()

    if (value) {
        return (
            <div className="group relative flex justify-center items-center">
                {type !== 'pdf' ? (
                    <div className="relative size-8">
                        <Image
                            src={value}
                            alt="uploaded image"
                            className="object-contain"
                            fill
                        />
                    </div>
                ) : (
                    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                        <FileIcon/>
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener_noreferrer"
                            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                        >
                            View PDF
                        </a>
                    </div>
                )}
                <div className="absolute inset-0 hidden h-full w-full items-center justify-center rounded-lg bg-default/75 backdrop-blur-lg group-hover:flex">
                    <Button
                        isIconOnly
                        type="button"
                        variant="light"
                        color="danger"
                        size="sm"
                        className="text-danger"
                        onClick={() => onChange('')}
                    >
                        <HiTrash className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-muted/30">
            <UploadDropzone
                endpoint={endpoint}
                config={{
                    mode: 'manual',
                    appendOnPaste: true,
                }}
                onDrop={(acceptedFiles) => {
                    const droppedFile = acceptedFiles[0]

                    if (droppedFile) {
                        const previewUrl = URL.createObjectURL(droppedFile)
                        onChange(previewUrl)
                    }
                }}
            />
        </div>
    )
}
