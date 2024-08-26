import { ReactNode } from 'react'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import Link from 'next/link'
import { GearWFMCogIcon } from '@/components/icons/gear-wfm-cog-icon'

export default function PublicLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <main className="h-dvh">
                <Navbar
                    isBordered
                    classNames={{
                        wrapper: 'max-w-full',
                    }}
                >
                    <NavbarBrand>
                        <div
                            className="transform transition duration-500 ease-in-out hover:translate-y-2 hover:scale-110">
                            <Link href="/">
                                <GearWFMCogIcon
                                    className="h-10 w-10 fill-brand-primary drop-shadow-lg hover:animate-spin-5s"/>
                            </Link>
                        </div>
                        {/*<img alt="Logo" src="/images/logos/gear-wfm-icon.png" className="size-12" />*/}
                        <p className="font-bold text-inherit text-2xl italic align-bottom pl-2 self-end">
                            GearWFM
                        </p>
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
            </main>
        </ClerkProvider>
    )
}
