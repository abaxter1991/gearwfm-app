import Link from 'next/link'
import prisma from '@/prisma/client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'

export default async function SalesOrdersPage() {
    const salesOrders = await prisma.salesOrder.findMany()

    return (
        <div className="flex w-full justify-center p-24">
            <div className="grid grid-cols-3 w-full max-w-5xl gap-4">
                {salesOrders.map((salesOrder) => (
                    <Link key={salesOrder.id} href={`/sales-orders/${salesOrder.id}`}>
                        <Card>
                            <CardHeader>
                                {salesOrder.companyName || '<Company Name>'}
                            </CardHeader>
                            <CardBody>
                                <p>
                                    Sales Rep: {salesOrder.salesRepName}
                                </p>
                                <p>
                                    Company Name: {salesOrder.companyName}
                                </p>
                                <p>
                                    Contact Name: {salesOrder.contactName}
                                </p>
                                <p>
                                    Created Date: {salesOrder.createdAt.toLocaleDateString()}
                                </p>
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
