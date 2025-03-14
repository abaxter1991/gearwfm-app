'use client'

import { Button, Spinner } from '@heroui/react'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import type { ReactNode } from 'react'

type Props = {
    onPress: () => Promise<void>
    className?: string
    children?: ReactNode
}

export function IsPaidButtonToggle({ onPress, className, children }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Button
            size="sm"
            onPress={async () => {
                if (isLoading) {
                    return
                }

                setIsLoading(true)
                await onPress()
                setIsLoading(false)
            }}
            className={cn('group relative', className)}
        >
            {children}
            <div className={cn('absolute inset-0 size-full items-center justify-center backdrop-blur-[1px]', isLoading ? 'flex' : 'hidden')}>
                {isLoading && <Spinner classNames={{wrapper: 'h-4 w-4'}}/>}
            </div>
        </Button>
    )
}