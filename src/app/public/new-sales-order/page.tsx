'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { SalesOrderForm } from '~/components/forms/sales-order-form'

export default function PublicNewSalesOrderPage() {
    const { isSignedIn } = useUser()
    const router = useRouter()

    if (isSignedIn) {
        router.push('/sales-orders/new-sales-order')
    }

    return <SalesOrderForm />
}
