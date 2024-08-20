import { ReactNode } from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { AcmeLogo } from '@/components/logos/acme-logo'

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <Navbar
                isBordered
                classNames={{
                    wrapper: 'max-w-full'
                }}
            >
                <NavbarBrand>
                    <img alt="Logo" src="/images/logos/gear-wfm-icon.png" className="size-12" />
                    {/*<AcmeLogo/>*/}
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <ThemeSwitcher/>
                    </NavbarItem>
                    <NavbarItem>
                        <SignedOut>
                            <SignInButton/>
                        </SignedOut>
                        <SignedIn>
                            <UserButton/>
                        </SignedIn>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <main className="h-full w-full max-h-full p-4 overflow-y-scroll">
                {children}
            </main>
        </ClerkProvider>
    )
}
