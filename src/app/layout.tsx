import { DM_Sans } from 'next/font/google'
import { Toaster as SonnerToaster } from '~/components/ui/sonner'
import { Toaster } from '~/components/ui/toaster'
import { AppProvider } from '~/providers/app-provider'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'GearWFM',
    description: 'Workflow Management Software and Solutions',
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className={font.className}>
                <AppProvider>
                    {children}
                    <Toaster />
                    <SonnerToaster position="top-right" />
                </AppProvider>
            </body>
        </html>
    )
}
