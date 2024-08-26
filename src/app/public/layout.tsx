import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { TopBar } from '@/components/layout/top-bar'

export default function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <main className="h-dvh">
                <TopBar />
                <div className="h-dvh p-4">
                    {children}
                </div>
            </main>
        </ClerkProvider>
    )
}
