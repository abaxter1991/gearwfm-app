import { Card, CardBody, CardHeader, Divider } from '@heroui/react'
import Link from 'next/link'

export default async function HomePage() {
    return (
        <div className="flex h-full justify-center p-24">
            <Link href="/sales-orders">
                <Card>
                    <CardHeader>
                        <h1 className="text-2xl font-bold">Sales Orders</h1>
                    </CardHeader>
                    <Divider />
                    <CardBody>Click this card to view all sales orders!</CardBody>
                </Card>
            </Link>
        </div>
    )
}
