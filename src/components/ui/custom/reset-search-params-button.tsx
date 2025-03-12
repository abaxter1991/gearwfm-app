'use client'

import { Button } from '@heroui/react'
import { usePathname, useRouter } from 'next/navigation'

export function ResetSearchParamsButton() {
    const router = useRouter()
    const pathname = usePathname()

    const handleResetSearchParams = () => {
        router.push(pathname)
    }

    return (
        <Button
            size="sm"
            className="bg-gradient-to-br from-red-600 to-danger text-white shadow-md"
            onPress={handleResetSearchParams}
        >
            Reset
        </Button>
    )
}
