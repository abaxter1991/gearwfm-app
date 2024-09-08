import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { TopBar } from '~/components/layout/top-bar'
import type { ReactNode } from 'react'

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <TopBar />
            <main className="size-full max-h-full overflow-y-scroll p-4">{children}</main>
        </ClerkProvider>
    )
}
