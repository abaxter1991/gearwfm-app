import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { TopBar } from '@/components/layout/top-bar'

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <TopBar />
            <main className="h-full w-full max-h-full p-4 overflow-y-scroll">
                {children}
            </main>
        </ClerkProvider>
    )
}
