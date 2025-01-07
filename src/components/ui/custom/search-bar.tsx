'use client'

import { parseDate, getLocalTimeZone, now, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear, CalendarDate } from '@internationalized/date'
import { Button, Card, CardBody, DateRangePicker, Input, Select, SelectItem } from '@nextui-org/react'
import { useLocale } from '@react-aria/i18n'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import type { DateValue } from '@react-types/datepicker'
import type { RangeValue } from '@react-types/shared'
import type { KeyboardEvent } from 'react'

const today = now(getLocalTimeZone())
const todayDate = today.toDate()
const todayDateString = new CalendarDate(todayDate.getFullYear(), todayDate.getMonth() + 1, todayDate.getDate()).toString()
const initialDate = startOfYear(today).toDate()
const initialDateString = new CalendarDate(initialDate.getFullYear() - 1, 1, 1).toString()
const initialDateRange = { start: parseDate(initialDateString), end: parseDate(todayDateString) }

export function SearchBar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { locale } = useLocale()

    const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(initialDateRange)
    const [searchDateBy, setSearchDateBy] = useState<string>('orderDate')
    const [sortDateBy, setSortDateBy] = useState<string>('desc')
    const [search, setSearch] = useState<string>('')

    const searchDateByItems = [
        { key: 'orderDate', label: 'Order Date' },
        { key: 'dueDate', label: 'Due Date' },
    ]

    const sortDateByItems = [
        { key: 'asc', label: 'Oldest to Newest' },
        { key: 'desc', label: 'Newest to Oldest' },
    ]

    useEffect(() => {
        const startDateString = searchParams.get('startDate')
        const endDateString = searchParams.get('endDate')
        const searchDateByString = searchParams.get('searchDateBy')
        const sortDateByString = searchParams.get('sortDateBy')
        const searchString = searchParams.get('search')

        if (startDateString && endDateString) {
            setDateRange({
                start: parseDate(startDateString),
                end: parseDate(endDateString),
            })
        }

        if (searchDateByString) setSearchDateBy(searchDateByString)
        if (sortDateByString) setSortDateBy(sortDateByString)
        if (searchString) setSearch(searchString)
        if (!searchString) setSearch('')
    }, [searchParams])

    function handleSearch() {
        const params = new URLSearchParams(searchParams.toString())
        params.set('startDate', dateRange.start ? dateRange.start.toString() : '')
        params.set('endDate', dateRange.end ? dateRange.end.toString() : '')
        params.set('searchDateBy', searchDateBy)
        params.set('sortDateBy', sortDateBy)

        if (search === '') {
            params.delete('search')
        } else {
            params.set('search', search)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    function getDateString(date: Date) {
        return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate()).toString()
    }

    function formatAndSetDateRange(startDate: Date, endDate: Date) {
        const startDateString = getDateString(startDate)
        const endDateString = getDateString(endDate)

        setDateRange({
            start: parseDate(startDateString),
            end: parseDate(endDateString),
        })
    }

    function handleSetToday() {
        formatAndSetDateRange(todayDate, todayDate)
    }

    function handleSetLast7Days() {
        const startDate = today.subtract({ days: 7 }).toDate()
        formatAndSetDateRange(startDate, todayDate)
    }

    function handleSetWeekToDate() {
        const startDate = startOfWeek(today, locale).toDate()
        formatAndSetDateRange(startDate, todayDate)
    }

    function handleSetMonthToDate() {
        const startDate = startOfMonth(today).toDate()
        formatAndSetDateRange(startDate, todayDate)
    }

    function handleSetYearToDate() {
        const startDate = startOfYear(today).toDate()
        formatAndSetDateRange(startDate, todayDate)
    }

    function handleSetLastWeek() {
        const startDate = startOfWeek(today.subtract({ weeks: 1 }), locale).toDate()
        const endDate = endOfWeek(today.subtract({ weeks: 1 }), locale).toDate()
        formatAndSetDateRange(startDate, endDate)
    }

    function handleSetLastMonth() {
        const startDate = startOfMonth(today.subtract({ months: 1 })).toDate()
        const endDate = endOfMonth(today.subtract({ months: 1 })).toDate()
        formatAndSetDateRange(startDate, endDate)
    }

    function handleSetLastYear() {
        const startDate = startOfYear(today.subtract({ years: 1 })).toDate()
        const endDate = endOfYear(today.subtract({ years: 1 })).toDate()
        formatAndSetDateRange(startDate, endDate)
    }

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
                            calendarProps={{
                                focusedValue: dateRange?.start,
                            }}
                            CalendarBottomContent={
                                <div className="flex w-full items-center gap-1 overflow-x-scroll p-2">
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetToday}>Today</Button>
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetLast7Days}>Last 7 Days</Button>
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetWeekToDate}>Week to Date</Button>
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetMonthToDate}>Month to Date</Button>
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetYearToDate}>Year to Date</Button>
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetLastWeek}>Last Week</Button>
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetLastMonth}>Last Month</Button>
                                    <Button size="sm" variant="bordered" className="shrink-0" onPress={handleSetLastYear}>Last Year</Button>
                                </div>
                            }
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
                    <Select
                        label="Sort Date By"
                        variant="flat"
                        placeholder="Choose a filter..."
                        labelPlacement="outside"
                        selectedKeys={[sortDateBy]}
                        onChange={(event) => {
                            setSortDateBy(event.target.value)
                        }}
                        className="max-w-48"
                        classNames={{
                            value: 'text-foreground',
                            listboxWrapper: 'overscroll-contain',
                            popoverContent: 'w-auto',
                        }}
                    >
                        {sortDateByItems.map((item) => (
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
                            variant="flat"
                            placeholder="Type to search..."
                            value={search}
                            onValueChange={setSearch}
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
