'use client'

import axios from 'axios'
import { HiTrash } from 'react-icons/hi2'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { UploadDropzone } from '@/lib/uploadthing'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

type FileUploadProps = {
    endpoint: 'mockups'
    onChange: (url?: string) => void
    value?: string
}

export function FileUpload({ endpoint, onChange, value }: FileUploadProps) {
    const handleDeleteImage = async () => {
        if (value) {
            const fileKey = value.replace('https://utfs.io/f/', '')
            await axios.delete(`${baseUrl}/api/uploadthing/delete/${fileKey}`)
        }

        onChange('')
    }

    if (value) {
        return (
            <div className="w-full">
                <p className="text-tiny pb-1.5">
                    MOCK UP
                </p>
                <div className="group relative flex items-center justify-center w-full">
                    <div className="relative size-8">
                        <Image
                            src={value}
                            alt="uploaded image"
                            className="object-contain"
                            fill
                        />
                    </div>
                    <div className="absolute inset-0 hidden h-full w-full items-center justify-center rounded-lg backdrop-blur-[2px] group-hover:flex">
                            <Button
                                isIconOnly
                                type="button"
                                variant="bordered"
                                color="danger"
                                size="sm"
                                className="text-danger bg-transparent"
                                onClick={handleDeleteImage}
                            >
                                <HiTrash className="size-6"/>
                            </Button>
                        </div>
                    </div>
                </div>
                )
                }

                return (
                <div className="w-full">
                    <p className="text-tiny pb-1.5">
                        MOCKUP
            </p>
            <UploadDropzone
                endpoint={endpoint}
                config={{
                    mode: 'auto',
                }}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url)
                }}
                onUploadError={(error: Error) => {
                    console.log(error)
                }}
                className="border-2 border-brand-primary border-solid p-0 m-0 w-full ut-label:hidden ut-upload-icon:hidden ut-allowed-content:hidden ut-button:m-0 ut-button:h-7 ut-button:text-tiny ut-button:rounded-medium ut-button:bg-transparent"
                // appearance={{
                //     container:
                // }}
            />
        </div>
    )
}
