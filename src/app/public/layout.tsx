import { ReactNode } from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { AcmeLogo } from '@/components/logos/acme-logo'

export default function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <main className="h-dvh">

                {/*<div className="relative h-full bg-pink-300">*/}

                    <Navbar
                        isBordered
                        classNames={{
                            wrapper: 'max-w-full',
                        }}
                    >
                        <NavbarBrand>
                            <AcmeLogo />
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
                    <div className="h-dvh p-4">
                        {children}
                    </div>
                {/*</div>*/}
            </main>
        </ClerkProvider>
    )
}
