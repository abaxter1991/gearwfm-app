'use client'

import axios from 'axios'
import { HiTrash } from 'react-icons/hi2'
import Image from 'next/image'
import { Button } from '@nextui-org/react'
import { UploadDropzone } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

type Props = {
    endpoint: 'mockups' | 'devMockups'
    onChange: (url?: string) => void
    value?: string
}

export function FileUpload({ endpoint, onChange, value }: Props) {
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
                            alt="Mockup Image"
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
                appearance={{
                    container: 'w-full m-0 p-0 rounded-small border-2 border-brand-primary border-solid',
                    uploadIcon: 'hidden',
                    label: 'hidden',
                    allowedContent: 'hidden',
                    button: cn(
                        'h-7 w-auto m-0',
                        'text-primary-foreground text-tiny bg-transparent',
                        'ut-uploading:w-full ut-uploading:cursor-not-allowed',
                        'focus-within:ring-brand-primary',
                        'after:bg-brand-primary',
                    ),
                }}
                content={{
                    button({ ready }) {
                        if (ready) return 'Find Image'
                        // TODO: Replace with an animated loader.
                        return 'Loading...'
                    },
                }}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url)
                }}
                onUploadAborted={() => {
                    alert('Upload aborted!')
                }}
                onUploadError={(error: Error) => {
                    console.error(error, error.cause)
                    alert('Upload failed!')
                }}
            />
        </div>
    )
}
