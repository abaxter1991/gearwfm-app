'use client'

import { parseDate, getLocalTimeZone, now, CalendarDate } from '@internationalized/date'
import { Button, Card, CardBody, DateRangePicker, Input, Select, SelectItem } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import type { DateValue } from '@react-types/datepicker'
import type { RangeValue } from '@react-types/shared'
import type { KeyboardEvent } from 'react'

const today = now(getLocalTimeZone()).toDate()
const todayString = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()).toString()
const firstDayOfYearString = new CalendarDate(today.getFullYear(), 1, 1).toString()

const initialDateRange = {
    start: parseDate(firstDayOfYearString),
    end: parseDate(todayString),
}

export function SearchBar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(initialDateRange)
    const [searchDateBy, setSearchDateBy] = useState<string>('orderDate')
    const [search, setSearch] = useState('')

    const startDateString = searchParams.get('startDate')
    const endDateString = searchParams.get('endDate')
    const searchDateByString = searchParams.get('searchDateBy')
    const searchString = searchParams.get('search')

    useEffect(() => {
        if (startDateString && endDateString) {
            setDateRange({
                start: parseDate(startDateString),
                end: parseDate(endDateString),
            })
        }

        if (searchDateByString) setSearchDateBy(searchDateByString)
        if (searchString) setSearch(searchString)
    }, [searchParams])

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('startDate', dateRange.start ? dateRange.start.toString() : '')
        params.set('endDate', dateRange.end ? dateRange.end.toString() : '')
        params.set('searchDateBy', searchDateBy)
        params.set('search', search)
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    const searchDateByItems = [
        { key: 'orderDate', label: 'Order Date' },
        { key: 'dueDate', label: 'Due Date' },
    ]

    return (
        <Card className="w-full">
            <CardBody>
                <div className="flex items-end gap-4">
                    <div className="flex gap-4">
                        <DateRangePicker
                            label="Search Date Range"
                            labelPlacement="outside"
                            visibleMonths={2}
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </div>
                    <Select
                        label="Search Date By"
                        variant="flat"
                        placeholder="Choose a filter..."
                        labelPlacement="outside"
                        selectedKeys={[searchDateBy]}
                        onChange={(event) => {
                            setSearchDateBy(event.target.value)
                        }}
                        className="max-w-48"
                        classNames={{
                            value: 'text-foreground',
                            listboxWrapper: 'overscroll-contain',
                            popoverContent: 'w-auto',
                        }}
                    >
                        {searchDateByItems.map((item) => (
                            <SelectItem
                                key={item.key}
                                textValue={item.label}
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <div className="flex w-full items-center gap-4">
                        <Input
                            isClearable
                            variant="flat"
                            placeholder="Type to search..."
                            value={search}
                            onValueChange={setSearch}
                            onClear={() => setSearch('')}
                            onKeyDown={handleKeyDown}
                            startContent={<HiMagnifyingGlass className="pointer-events-none mx-2 shrink-0 text-2xl text-default-400" />}
                            classNames={{
                                inputWrapper: 'shadow-inner',
                            }}
                        />
                        <Button
                            type="button"
                            variant="solid"
                            color="primary"
                            size="sm"
                            onPress={handleSearch}
                            className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
