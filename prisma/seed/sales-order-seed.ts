import { faker } from '@faker-js/faker'
import { SalesOrderStatus } from '@prisma/client'
import { createManyProductSeeds } from './product-seed'
import type { Prisma } from '@prisma/client'

export function createSalesOrderSeed(): Prisma.SalesOrderCreateInput {
    const orderDate = faker.date.past({ years: 1 })
    const dueDate = faker.date.future({ years: 1, refDate: orderDate })

    const numberOfProducts = faker.number.int({ min: 0, max: 25 })
    const products = createManyProductSeeds(numberOfProducts)
    const productsToAssemble: string[] = []

    products.forEach((product) => {
        if (product.item && !productsToAssemble.includes(product.item)) {
            productsToAssemble.push(product.item)
        }
    })

    const assembledProducts = productsToAssemble.map((item) => {
        return { item, allAssembled: false }
    })

    const discount = faker.number.int({ min: 0, max: 15 })
    const shippingPrice = faker.number.int({ min: 0, max: 25 })
    const subtotalSum = products.reduce((total, product) => typeof product.subtotal === 'number' ? total + product.subtotal : total, 0)
    const discountAmount = subtotalSum * (discount / 100)
    const grandTotal = Number(Number(subtotalSum - discountAmount + Number(shippingPrice)).toFixed(2))

    return {
        orderDate,
        dueDate,
        userId: faker.string.uuid(),
        status: faker.helpers.enumValue(SalesOrderStatus),
        isDraft: faker.datatype.boolean(),
        isNewCustomer: faker.datatype.boolean(),
        isArchived: faker.datatype.boolean(),
        archivedReason: faker.lorem.sentence(),
        externalId: faker.string.alphanumeric({ length: 10, casing: 'upper' }),
        referenceId: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
        salesRepName: faker.person.fullName(),
        salesRepEmailAddress: faker.internet.email(),
        customerServiceRepName: faker.person.fullName(),
        companyName: faker.company.name(),
        contactName: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
        emailAddress: faker.internet.email(),
        shippingAddress: faker.location.streetAddress(),
        billingAddress: faker.location.streetAddress(),
        notes: faker.lorem.paragraph(),
        trackingNumber: faker.string.alphanumeric({ length: 15, casing: 'upper' }),
        discount: discount,
        shippingPrice: shippingPrice,
        grandTotal: grandTotal,
        approvedProof: faker.datatype.boolean(),
        partsOrdered: faker.datatype.boolean(),
        partsReceived: faker.datatype.boolean(),
        productsCounted: faker.datatype.boolean(),
        productsShipped: faker.datatype.boolean(),
        products: { create: products },
        assembledProducts: { create: assembledProducts },
    }
}

export function createManySalesOrderSeeds(numberOfOrders: number): Prisma.SalesOrderCreateManyInput[] {
    return Array.from({ length: numberOfOrders }, () => createSalesOrderSeed())
}
