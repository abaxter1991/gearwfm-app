import { NewSalesOrder } from '@/components/forms/sales-order-form'
import Link from 'next/link'
import prisma from '@/prisma/client'

export default async function SalesOrderPage({ params }: { params: { salesOrderId: string } }) {
    const salesOrderId = params.salesOrderId
    
    return (
        <NewSalesOrder />
    )
}
