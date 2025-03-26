'use client'

import { useUser } from '@clerk/nextjs'
import { Tabs, Tab } from '@heroui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function StatusTabs() {
    const { user } = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const hasQuotePermissions = [
        'Austin Baxter',
        'Shawn Baxter',
        'Cassie Baxter',
        'Leisel Baxter',
        'Rob Christensen',
        'Spencer Lambert',
        'Andrea Smith',
    ]

    const isAdmin = hasQuotePermissions.includes(String(user?.fullName))

    const handleTabSelected = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        params.set('page', '1')
        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams])

    return (
        <div className="flex flex-wrap gap-4">
            <Tabs
                defaultSelectedKey={searchParams.get('status') || undefined}
                onSelectionChange={(key) => {
                    handleTabSelected('status', String(key))
                }}
                classNames={{
                    tabList: 'shadow-inner',
                    cursor: [
                        'group-data-[selected=true]:bg-gradient-to-br',
                        'group-data-[selected=true]:from-brand-primary',
                        'group-data-[selected=true]:to-cyan-400',
                    ],
                    tabContent: 'group-data-[selected=true]:text-black',
                }}
            >
                <Tab key="all" title="All"/>
                {isAdmin && <Tab key="quote" title="Quote"/>}
                <Tab key="design_review" title="Design Review"/>
                <Tab key="pending" title="Pending"/>
                <Tab key="in_production" title="In Production"/>
                <Tab key="completed" title="Completed"/>
            </Tabs>
        </div>
    )
}
