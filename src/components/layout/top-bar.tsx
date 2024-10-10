import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { GearWFMCogIcon } from '~/components/icons/gear-wfm-cog-icon'
import { ThemeSwitcher } from '~/components/theme-switcher'

export function TopBar() {
    return (
        <Navbar
            isBordered
            classNames={{
                wrapper: 'max-w-full',
            }}
        >
            <NavbarBrand>
                <div className="transition duration-500 ease-in-out hover:translate-y-2 hover:scale-110">
                    <Link href="/sales-orders">
                        <GearWFMCogIcon className="size-12 fill-brand-primary drop-shadow-lg hover:animate-spin-5s" />
                    </Link>
                </div>
                <p className="self-end pl-2 align-bottom text-2xl font-bold italic text-inherit">GearWFM</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <SignedIn>
                        <Button
                            as={Link}
                            href="/sales-orders/new-sales-order"
                            variant="solid"
                            size="sm"
                            className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                        >
                            New Order
                        </Button>
                    </SignedIn>
                </NavbarItem>
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
