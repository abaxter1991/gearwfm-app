import { PrismaClient } from '@prisma/client'
import { createManySalesOrderSeeds } from './sales-order-seed'

const prisma = new PrismaClient()

async function main() {
    const salesOrderSeeds = createManySalesOrderSeeds(2)

    for (const seed of salesOrderSeeds) {
        console.log(seed)
        // await prisma.salesOrder.create({ data: seed })
    }

    // console.log(JSON.stringify(salesOrders, null, 4))
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
