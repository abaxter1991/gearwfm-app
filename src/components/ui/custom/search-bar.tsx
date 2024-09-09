'use client'

import { Chip, Input, Select, SelectItem } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import type { SelectedItems, Selection } from '@nextui-org/react'
import type { KeyboardEvent } from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type SearchBy = {
    key: string
    label: string
}

export function SearchBar() {
    const [query, setQuery] = useState('')
    const [_searchBy, _setSearchBy] = useState<Selection>(new Set(['all']))

    const router = useRouter()

    const searchParams = useSearchParams()!

    const search = searchParams.get('search')

    useEffect(() => {
        if (search) setQuery(search)
    }, [search])

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && query) {
            if (query !== '') {
                const queryString = `${BASE_URL}?${createQueryString('search', query)}`
                router.push(queryString)
            } else {
                router.push('/')
            }
        } else if (e.key === 'Enter') {
            router.push('/')
        }
    }

    const searchByItems = [
        { key: 'all', label: 'All' },
        { key: 'salesRepName', label: 'Sales Rep Name' },
        { key: 'customerName', label: 'Customer Name' },
    ]

    return (
        <div className="flex w-full flex-col gap-4 lg:flex lg:w-2/5">
            <Input
                isClearable
                variant="flat"
                placeholder="Type to search..."
                value={query}
                onValueChange={setQuery}
                onClear={() => setQuery('')}
                onKeyDown={handleKeyDown}
                startContent={<HiMagnifyingGlass className="pointer-events-none mx-2 shrink-0 text-2xl text-default-400" />}
                classNames={{
                    inputWrapper: 'shadow-inner',
                }}
            />
            <Select
                items={searchByItems}
                label="Search By"
                variant="flat"
                isMultiline={true}
                selectionMode="multiple"
                placeholder="Choose 1 or more search filters..."
                labelPlacement="outside"
                classNames={{
                    trigger: 'px-0 overflow-hidden bg-transparent',
                    label: 'h-10 w-36 p-0 bg-brand-primary flex items-center justify-center',
                }}
                renderValue={(items: SelectedItems<SearchBy>) => {
                    return (
                        <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                                <Chip
                                    key={item.key}
                                    size="sm"
                                    radius="sm"
                                    color="warning"
                                >
                                    {item.data?.label}
                                </Chip>
                            ))}
                        </div>
                    )
                }}
            >
                {(item) => (
                    <SelectItem
                        key={item.key}
                        textValue={item.label}
                    >
                        {item.label}
                    </SelectItem>
                )}
            </Select>
        </div>
    )
}
