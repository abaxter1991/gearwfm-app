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
    const { locale } = useLocale()

    const [dateRange, setDateRange] = useState<RangeValue<DateValue>>(initialDateRange)
    const [searchDateBy, setSearchDateBy] = useState<string>('orderDate')
    const [search, setSearch] = useState<string>('')

    useEffect(() => {
        const startDateString = searchParams.get('startDate')
        const endDateString = searchParams.get('endDate')
        const searchDateByString = searchParams.get('searchDateBy')
        const searchString = searchParams.get('search')

        if (startDateString && endDateString) {
            setDateRange({
                start: parseDate(startDateString),
                end: parseDate(endDateString),
            })
        }

        if (searchDateByString) setSearchDateBy(searchDateByString)
        if (searchString) setSearch(searchString)
        if (!searchString) setSearch('')
    }, [searchParams])

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('startDate', dateRange.start ? dateRange.start.toString() : '')
        params.set('endDate', dateRange.end ? dateRange.end.toString() : '')
        params.set('searchDateBy', searchDateBy)
        // params.set('search', search)

        if (search === '') {
            params.delete('search')
        } else {
            params.set('search', search)
        }

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

    const handleSetToday = () => {
        setDateRange({
            start: parseDate(todayString),
            end: parseDate(todayString),
        })
    }

    const handleSetLast7Days = () => {
        const startDate = now(getLocalTimeZone()).subtract({ days: 7 }).toDate()
        const startString = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()).toString()

        setDateRange({
            start: parseDate(startString),
            end: parseDate(todayString),
        })
    }

    const handleSetWeekToDate = () => {
        const startDate = startOfWeek(now(getLocalTimeZone()), locale).toDate()
        const startString = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()).toString()

        setDateRange({
            start: parseDate(startString),
            end: parseDate(todayString),
        })
    }

    const handleSetMonthToDate = () => {
        const startDate = startOfMonth(now(getLocalTimeZone())).toDate()
        const startString = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()).toString()

        setDateRange({
            start: parseDate(startString),
            end: parseDate(todayString),
        })
    }

    const handleSetYearToDate = () => {
        const startDate = startOfYear(now(getLocalTimeZone())).toDate()
        const startString = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()).toString()

        setDateRange({
            start: parseDate(startString),
            end: parseDate(todayString),
        })
    }

    const handleSetLastWeek = () => {
        const startDate = startOfWeek(now(getLocalTimeZone()).subtract({ weeks: 1 }), locale).toDate()
        const startString = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()).toString()
        const endDate = endOfWeek(now(getLocalTimeZone()).subtract({ weeks: 1 }), locale).toDate()
        const endString = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()).toString()

        setDateRange({
            start: parseDate(startString),
            end: parseDate(endString),
        })
    }

    const handleSetLastMonth = () => {
        const startDate = startOfMonth(now(getLocalTimeZone()).subtract({ months: 1 })).toDate()
        const startString = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()).toString()
        const endDate = endOfMonth(now(getLocalTimeZone()).subtract({ months: 1 })).toDate()
        const endString = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()).toString()

        setDateRange({
            start: parseDate(startString),
            end: parseDate(endString),
        })
    }

    const handleSetLastYear = () => {
        const startDate = startOfYear(now(getLocalTimeZone()).subtract({ years: 1 })).toDate()
        const startString = new CalendarDate(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()).toString()
        const endDate = endOfYear(now(getLocalTimeZone()).subtract({ years: 1 })).toDate()
        const endString = new CalendarDate(endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()).toString()

        setDateRange({
            start: parseDate(startString),
            end: parseDate(endString),
        })
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
