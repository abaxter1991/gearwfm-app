'use client'

import { Card, CardBody, Tabs, Tab } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function StatusTabs() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleTabSelected = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams])

    return (
        <Card className="w-fit">
            <CardBody>
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
                    <Tab key="draft" title="Draft"/>
                    <Tab key="pending" title="Pending"/>
                    <Tab key="in_progress" title="In Progress"/>
                    <Tab key="completed" title="Completed"/>
                </Tabs>
            </CardBody>
        </Card>
        // <div className="flex flex-wrap gap-4">
        //     <Tabs
        //         defaultSelectedKey={searchParams.get('status') || undefined}
        //         onSelectionChange={(key) => {
        //             handleTabSelected('status', String(key))
        //         }}
        //         classNames={{
        //             tabList: 'shadow-inner',
        //             cursor: [
        //                 'group-data-[selected=true]:bg-gradient-to-br',
        //                 'group-data-[selected=true]:from-brand-primary',
        //                 'group-data-[selected=true]:to-cyan-400',
        //             ],
        //             tabContent: 'group-data-[selected=true]:text-black',
        //         }}
        //     >
        //         <Tab key="all" title="All"/>
        //         <Tab key="draft" title="Draft"/>
        //         <Tab key="pending" title="Pending"/>
        //         <Tab key="in_progress" title="In Progress"/>
        //         <Tab key="completed" title="Completed"/>
        //     </Tabs>
        // </div>
    )
}
