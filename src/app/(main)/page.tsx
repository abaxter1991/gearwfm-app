import Link from 'next/link'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'

export default function HomePage() {
  return (
      <div className="flex h-full justify-center p-24">
          <Link href="/sales-orders">
              <Card>
                  <CardHeader>
                      <h1 className="text-2xl font-bold">
                          Sales Orders
                      </h1>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                      Click this card to view all sales orders!
                  </CardBody>
              </Card>
          </Link>
      </div>
  )
}
