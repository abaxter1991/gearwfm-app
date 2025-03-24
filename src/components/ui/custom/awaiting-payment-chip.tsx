import { currentUser } from '@clerk/nextjs/server'
import { Chip } from '@heroui/react'
import prisma from '~/prisma/client'

export async function AwaitingPaymentChip() {
    const user = await currentUser()

    const isAdmin = user?.fullName === 'Austin Baxter' || user?.fullName === 'Shawn Baxter' || user?.fullName === 'Spencer Lambert'

    const salesOrders = await prisma.salesOrder.findMany()

    const totalAmountDue = salesOrders
        .filter(salesOrder => !salesOrder.isPaid)
        .reduce((total, salesOrder) => total + salesOrder.grandTotal, 0)

    return (
        isAdmin ? (
            <Chip
                size="lg"
                color="warning"
                radius="md"
                variant="faded"
            >
                Awaiting Payment: {Number(totalAmountDue).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}
            </Chip>
        ) : null
    )
}
