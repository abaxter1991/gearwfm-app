import prisma from '@/prisma/client'
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import { SalesOrderDetailModal } from '@/components/sales-order/sales-order-detail-modal'
import { SalesOrderProofModal } from '@/components/sales-order/sales-order-proof-modal'

export default async function SalesOrdersPage() {
    const salesOrders = await prisma.salesOrder.findMany({
        include: {
            products: true,
            assembledProducts: true,
        }
    })

    return (
        <div className="flex w-full justify-center">
            <div className="grid grid-cols-3 gap-8">
                {salesOrders.map((salesOrder) => (
                    <Card key={salesOrder.id} className="w-96 aspect-square justify-self-center">
                        <CardHeader className="justify-center">
                            <h1 className="text-2xl">
                                {salesOrder.companyName}
                            </h1>
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
                        <Divider />
                        <CardFooter className="justify-around">
                            <SalesOrderDetailModal salesOrder={salesOrder} />
                            <SalesOrderProofModal salesOrder={salesOrder} />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
