'use client'

import { Chip, Spinner } from '@nextui-org/react'
import { useState } from 'react'
import { HiCheck, HiXMark } from 'react-icons/hi2'
import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
    isToggled: boolean
    update: () => Promise<void>
}

export function CustomToggle({ children, isToggled, update }: Props) {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <Chip
            variant="faded"
            color={isToggled ? 'success' : 'default'}
            size="sm"
            radius="sm"
            className="cursor-pointer"
            startContent={isLoading ? <Spinner classNames={{ wrapper: 'h-4 w-4' }} /> : (isToggled ? <HiCheck className="size-4" /> : <HiXMark className="size-4" />)}
            onClick={async () => {
                if (isLoading) {
                    return
                }

                setIsLoading(true)
                await update()
                setIsLoading(false)
            }}
        >
            {children}
        </Chip>
    )
}
