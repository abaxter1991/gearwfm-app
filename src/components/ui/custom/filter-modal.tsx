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
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { HiOutlineFunnel } from 'react-icons/hi2'

export function FilterModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    // const router = useRouter()
    // const pathname = usePathname()
    // const searchParams = useSearchParams()

    const singularOptions = [
        { label: 'IS', key: 'true' },
        { label: 'IS NOT', key: 'false' },
    ]

    const pluralOptions = [
        { label: 'ARE', key: 'true' },
        { label: 'ARE NOT', key: 'false' },
    ]

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
                                <BooleanFilter prefix="Customer" suffix="new" options={singularOptions} />
                                <BooleanFilter prefix="Proof" suffix="approved" options={singularOptions} />
                                <BooleanFilter prefix="All parts" suffix="ordered" options={pluralOptions} />
                                <BooleanFilter prefix="All parts" suffix="received" options={pluralOptions} />
                            </ModalBody>
                            <Divider/>
                            <ModalFooter>
                                <Button
                                    type="button"
                                    size="sm"
                                    color="danger"
                                    variant="bordered"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    onPress={onClose}
                                    className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                                >
                                    Set Filters
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
    prefix: string
    suffix: string
    options: {
        label: string,
        key: string,
    }[]
}

function BooleanFilter({ prefix, suffix, options }: BooleanFilterProps) {
    return (
        <div className="flex items-center gap-2">
            <p>{prefix}</p>
            <Select
                size="sm"
                variant="bordered"
                // selectedKeys={[searchDateBy]}
                // onChange={(event) => {
                //     setSearchDateBy(event.target.value)
                // }}
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
