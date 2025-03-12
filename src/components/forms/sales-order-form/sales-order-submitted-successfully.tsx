'use client'

import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Link, Tooltip } from '@heroui/react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { useSalesOrder } from '~/lib/queries'

type Props = {
    salesOrderId: string
}

export function SalesOrderSubmittedSuccessfully({ salesOrderId }: Props) {
    const { data: salesOrder } = useSalesOrder(salesOrderId)

    const pathname = usePathname()

    const salesOrderFormHref = pathname.replace(`/success/${salesOrderId}`, '')

    return (
        <div className="absolute inset-0 flex h-dvh items-center justify-center">
            <Card className="max-w-5xl">
                <CardHeader>
                    <h1 className="text-2xl">
                        Success!
                    </h1>
                </CardHeader>
                <Divider />
                <CardBody className="items-center gap-4">
                    <p>Sales order for {salesOrder?.companyName} has successfully been submitted.</p>
                    {salesOrder && (
                        <Tooltip
                            delay={1000}
                            color="warning"
                            className="max-w-xl"
                            content={
                                <div className="flex flex-col gap-2">
                                    <div>
                                        Click to copy!
                                    </div>
                                    <div>
                                        Use this ID to lookup the sales order that was just submitted.
                                        If you are using the public sales order form, then you can give this ID to an in office rep to lookup the order.
                                        Otherwise the order can be found by searching details submitted in the form.
                                    </div>
                                </div>
                            }
                        >
                            <Button
                                size="sm"
                                radius="sm"
                                color="warning"
                                variant="flat"
                                onPress={() => {
                                    navigator.clipboard.writeText(salesOrder.id)
                                    toast(
                                        <Chip
                                            size="sm"
                                            radius="sm"
                                            color="success"
                                            variant="flat"
                                        >
                                            Sales order ID copied to clipboard!
                                        </Chip>,
                                        {
                                            unstyled: true,
                                            position: 'bottom-center',
                                            classNames: {
                                                toast: 'absolute inset-0 flex items-center justify-center',
                                            },
                                        }
                                    )
                                }}
                            >
                                {salesOrder.id}
                            </Button>
                        </Tooltip>
                    )}
                </CardBody>
                <Divider />
                <CardFooter className="justify-end">
                    <Button
                        as={Link}
                        href={salesOrderFormHref}
                        variant="solid"
                        size="sm"
                        className="bg-gradient-to-br from-brand-primary to-cyan-400 text-black shadow-md"
                    >
                        New Order
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
