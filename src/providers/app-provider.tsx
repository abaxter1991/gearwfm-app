'use client'

import { HeroUIProvider } from '@heroui/react'
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
            <HeroUIProvider navigate={router.push}>
                <ThemeProvider
                    enableSystem
                    disableTransitionOnChange
                    attribute="class"
                    defaultTheme="dark"
                    themes={['light', 'dark', 'system']}
                >
                    {children}
                </ThemeProvider>
            </HeroUIProvider>
        </SwrProvider>
    )
}
