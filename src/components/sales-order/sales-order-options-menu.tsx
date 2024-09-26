'use client'

import { useUser } from '@clerk/nextjs'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import axios from 'axios'
import { HiArrowDownTray, HiEllipsisVertical, HiLink, HiPencilSquare, HiTrash } from 'react-icons/hi2'
import { cn, downloadUrl } from '~/lib/utils'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

type Props = {
    salesOrderId: string
    onDelete?: () => void
}

export function SalesOrderOptionsMenu({ salesOrderId, onDelete }: Props) {
    const { user } = useUser()
    const isAdmin = user?.fullName === 'Austin Baxter' || user?.fullName === 'Shawn Baxter'
    const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="default"
                >
                    <HiEllipsisVertical className="size-4 text-black"/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="faded"
                onAction={async(key) => {
                    if (key === 'copyLink') {
                        navigator.clipboard.writeText(`${baseUrl}/sales-orders/${salesOrderId}`)
                    }

                    if (key === 'deleteOrder') {
                        await axios.delete(`${apiBaseUrl}/sales-order/${salesOrderId}`)

                        if (onDelete) {
                            onDelete()
                        }
                    }

                    if (key === 'downloadOrder') {
                        downloadUrl(
                            `${apiBaseUrl}/sales-order/${salesOrderId}/download`,
                            'gear-wfm-sales-order.pdf',
                        )
                    }
                }}
            >
                <DropdownSection title="Actions" showDivider>
                    <DropdownItem
                        key="copyLink"
                        description="Copy the sales order link"
                        startContent={<HiLink className={iconClasses} />}
                    >
                        Copy Link
                    </DropdownItem>
                    <DropdownItem
                        key="editOrder"
                        description="Allows you to edit the sales order"
                        startContent={<HiPencilSquare className={iconClasses} />}
                        href={`/sales-orders/${salesOrderId}`}
                    >
                        Edit Order
                    </DropdownItem>
                    <DropdownItem
                        key="downloadOrder"
                        description="Download the sales order data sheet"
                        startContent={<HiArrowDownTray className={iconClasses} />}
                    >
                        Download Order
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Danger Zone">
                    <DropdownItem
                        isDisabled={!isAdmin}
                        key="deleteOrder"
                        className="text-danger"
                        color="danger"
                        description="This will archive the sales order"
                        startContent={<HiTrash className={cn(iconClasses, 'text-danger')} />}
                    >
                        Delete Order
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}
