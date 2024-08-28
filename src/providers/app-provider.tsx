'use client'

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { SwrProvider } from './swr-provider'
import { ThemeProvider } from './theme-provider'
import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export function AppProvider({ children }: Props) {
    const router = useRouter()

    return (
        <SwrProvider>
            <NextUIProvider navigate={router.push}>
                <ThemeProvider
                    enableSystem
                    disableTransitionOnChange
                    attribute="class"
                    defaultTheme="dark"
                    themes={['light', 'dark', 'system']}
                >
                    {children}
                </ThemeProvider>
            </NextUIProvider>
        </SwrProvider>
    )
}
