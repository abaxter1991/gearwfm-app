'use client'

import { Button } from '@heroui/react'
import axios from 'axios'
import Image from 'next/image'
import { HiTrash } from 'react-icons/hi2'
import { UploadDropzone } from '~/lib/uploadthing'
import { cn } from '~/lib/utils'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

type Props = {
    endpoint: 'mockups' | 'devMockups'
    onChange: (url?: string) => void
    value?: string
}

export function FileUpload({ endpoint, onChange, value }: Props) {
    async function handleDeleteImage() {
        if (value) {
            const fileKey = value.replace('https://utfs.io/f/', '')
            await axios.delete(`${baseUrl}/api/uploadthing/delete/${fileKey}`)
        }

        onChange('')
    }

    if (value) {
        return (
            <div className="w-full">
                <p className="pb-1.5 text-tiny">
                    MOCKUP
                </p>
                <div className="group relative flex w-full items-center justify-center">
                    <div className="relative size-8">
                        <Image
                            src={value}
                            alt="Mockup Image"
                            className="object-contain"
                            fill
                        />
                    </div>
                    <div className="absolute inset-0 hidden size-full items-center justify-center rounded-lg backdrop-blur-[2px] group-hover:flex">
                        <Button
                            isIconOnly
                            type="button"
                            variant="bordered"
                            color="danger"
                            size="sm"
                            className="bg-transparent text-danger"
                            onPress={handleDeleteImage}
                        >
                            <HiTrash className="size-6" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full">
            <p className="pb-1.5 text-tiny">
                MOCKUP
            </p>
            <UploadDropzone
                endpoint={endpoint}
                config={{
                    mode: 'auto',
                    cn: cn,
                }}
                appearance={{
                    container: 'w-full m-0 p-0 rounded-small border-2 border-brand-primary border-solid',
                    uploadIcon: 'hidden',
                    label: 'hidden',
                    allowedContent: 'hidden',
                    button: cn(
                        'm-0 h-7 w-auto',
                        'bg-transparent text-xs text-foreground',
                        'ut-uploading:w-full ut-uploading:cursor-not-allowed',
                        'focus-within:ring-brand-primary',
                        'after:bg-brand-primary',
                        'data-[state=ready]:bg-transparent data-[state=readying]:bg-transparent',
                    ),
                }}
                // content={{
                //     button({ ready }) {
                //         if (ready) return 'Find Image'
                //         // TODO: Replace with an animated loader.
                //         return 'Loading...'
                //     },
                // }}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0]?.url)
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
