'use client'

import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    useDisclosure,
} from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { HiOutlineFunnel } from 'react-icons/hi2'

export function FilterModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button
                size="sm"
                onPress={onOpen}
                className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                startContent={<HiOutlineFunnel className="pointer-events-none shrink-0 text-xl text-black" />}
            >
                Filters
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                size="5xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="items-center">
                                <h1 className="text-2xl">
                                    Filters
                                </h1>
                            </ModalHeader>
                            <Divider/>
                            <ModalBody>
                                <BooleanFilter name="isNewCustomer" prefix="Customer" suffix="new" optionType="singular" />
                                <BooleanFilter name="approvedProof" prefix="Proof" suffix="approved" optionType="singular" />
                                <BooleanFilter name="partsOrdered" prefix="All parts" suffix="ordered" optionType="plural" />
                                <BooleanFilter name="partsReceived" prefix="All parts" suffix="received" optionType="plural" />
                            </ModalBody>
                            <Divider/>
                            <ModalFooter>
                                <Button
                                    size="sm"
                                    onPress={onClose}
                                    className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                                >
                                    Done
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

type BooleanFilterProps = {
    name: string
    prefix: string
    suffix: string
    optionType: 'singular' | 'plural'
}

function BooleanFilter({ name, prefix, suffix, optionType }: BooleanFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [selected, setSelected] = useState<string | undefined>()

    const searchParam = searchParams.get(name)

    useEffect(() => {
        if (searchParam) setSelected(searchParam)
    }, [searchParams])

    const handleFilterSelected = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            setSelected(value)
            params.set(name, value)
        } else {
            setSelected(undefined)
            params.delete(name)
        }

        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams])

    const optionObjects = {
        singular: [
            { label: 'IS', key: 'true' },
            { label: 'IS NOT', key: 'false' },
        ],
        plural: [
            { label: 'ARE', key: 'true' },
            { label: 'ARE NOT', key: 'false' },
        ],
    }

    const options = optionObjects[optionType]

    return (
        <div className="flex items-center gap-2">
            <p>{prefix}</p>
            <Select
                size="sm"
                variant="bordered"
                selectedKeys={selected && [selected]}
                onChange={(event) => {
                    handleFilterSelected(name, event.target.value)
                }}
                className="max-w-28"
                classNames={{
                    // base: 'w-fit',
                    // trigger: 'w-fit',
                    // innerWrapper: 'w-fit pr-6 rtl:pl-6',
                    // selectorIcon: 'right-1 rtl:left-1',
                    value: 'text-center text-foreground',
                    listboxWrapper: 'overscroll-contain',
                    popoverContent: 'w-auto',
                }}
            >
                {options.map((item) => (
                    <SelectItem
                        key={item.key}
                        textValue={item.label}
                    >
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <p>{suffix}</p>
        </div>
    )
}
