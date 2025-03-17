'use client'

import { Pagination } from '@heroui/react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PaginationBarProps {
    totalPages: number
}

export default function PaginationBar ({ totalPages }: PaginationBarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [page, setPage] = useState<number>(1)

    const updateQueryParams = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page))

        router.push(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        updateQueryParams()
        const pageString = searchParams.get('page') || 1

        setPage(Number(pageString))
    }, [searchParams])

    useEffect(() => {
        updateQueryParams()
    }, [page])

    return (
        <>
            <Pagination
                isCompact
                showControls
                size="lg"
                total={totalPages}
                page={page}
                onChange={setPage}
                classNames={{
                    cursor: 'bg-brand-primary',
                }}
            />
        </>
    )
}
