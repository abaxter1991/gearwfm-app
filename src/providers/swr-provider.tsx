'use client'

import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetcher'
import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export function SwrProvider({ children }: Props) {
    return (
        <SWRConfig value={{ fetcher }}>
            {children}
        </SWRConfig>
    )
}
