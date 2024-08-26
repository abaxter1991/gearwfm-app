import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import Link from 'next/link'
import { GearWFMCogIcon } from '@/components/icons/gear-wfm-cog-icon'

export function TopBar() {
    return (
        <Navbar
            isBordered
            classNames={{
                wrapper: 'max-w-full',
            }}
        >
            <NavbarBrand>
                <div className="transform transition duration-500 ease-in-out hover:translate-y-2 hover:scale-110">
                    <Link href="/sales-orders">
                        <GearWFMCogIcon className="size-12 fill-brand-primary drop-shadow-lg hover:animate-spin-5s"/>
                    </Link>
                </div>
                <p className="font-bold text-inherit text-2xl italic align-bottom pl-2 self-end">
                    GearWFM
                </p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <SignedIn>
                        <Button
                            variant="solid"
                            className="bg-brand-primary text-black"
                        >
                            <Link href="/sales-orders/new-sales-order">
                                New Order
                            </Link>
                        </Button>
                    </SignedIn>
                </NavbarItem>
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
    )
}
