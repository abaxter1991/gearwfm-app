'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { SalesOrderForm } from 'src/components/forms/sales-order-form'

// TODO: Make this a server component
export default function PublicNewSalesOrderPage() {
    const { isSignedIn } = useUser()
    const router = useRouter()

    if (isSignedIn) {
        router.push('/sales-orders/new-sales-order')
    }

    return <SalesOrderForm />
}
