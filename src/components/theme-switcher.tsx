'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { HiComputerDesktop as SystemModeIcon, HiMoon as DarkModeIcon, HiSun as LightModeIcon } from 'react-icons/hi2'
import { cn } from '~/lib/utils'

type Props = {
    iconClasses?: string
}

export const ThemeSwitcher = (props: Props) => {
    const { iconClasses = 'pointer-events-none flex-shrink-0 text-xl text-default-500' } = props

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    const iconClassName = cn(iconClasses)

    const ThemeButtonIcon = () => {
        if (theme === 'light') {
            return <LightModeIcon className={iconClassName} />
        } else if (theme === 'dark') {
            return <DarkModeIcon className={iconClassName} />
        } else {
            return <SystemModeIcon className={iconClassName} />
        }
    }

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="flex items-center gap-4">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        size="sm"
                        color="default"
                        variant="light"
                        aria-label="Theme"
                    >
                        <ThemeButtonIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded">
                    <DropdownItem
                        key="light"
                        startContent={<LightModeIcon className={iconClassName} />}
                        onClick={() => setTheme('light')}
                    >
                        Light
                    </DropdownItem>
                    <DropdownItem
                        key="dark"
                        startContent={<DarkModeIcon className={iconClassName} />}
                        onClick={() => setTheme('dark')}
                    >
                        Dark
                    </DropdownItem>
                    <DropdownItem
                        key="system"
                        startContent={<SystemModeIcon className={iconClassName} />}
                        onClick={() => setTheme('system')}
                    >
                        System
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
