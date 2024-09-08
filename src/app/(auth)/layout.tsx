import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { ReactNode } from 'react'

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <main className="flex h-dvh items-center justify-center">{children}</main>
        </ClerkProvider>
    )
}
