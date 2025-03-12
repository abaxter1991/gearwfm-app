import { faker } from '@faker-js/faker'
import { isOneSizeFitsAll, sortedCategoryKeys } from '~/lib/constants/product-categories'
import { generateRandomNumberInRange } from '~/lib/data/generators/random-number'
import type { Prisma } from '@prisma/client'

function getRandomQuantity(): number {
    return generateRandomNumberInRange({
        min: 0,
        max: 100,
        segments: [
            { percentOfRange: 0, weight: 80 },  // 80% chance for 0 (first 0% of range)
            { percentOfRange: 25, weight: 15 }, // 15% chance for 1-25 (next 25% of range)
            { percentOfRange: 75, weight: 5 },  // 5% chance for 26-100 (remaining 75%)
        ]
    })
}

function getRandomUnitPrice(): number {
    return generateRandomNumberInRange({
        min: 10,
        max: 100,
        segments: [
            { percentOfRange: 10, weight: 90 },
            { percentOfRange: 25, weight: 7 },
            { percentOfRange: 65, weight: 3 },
        ]
    })
}

export function createProductSeed(): Prisma.SalesOrderProductCreateInput {
    const itemIndex = faker.number.int({ min: 0, max: sortedCategoryKeys.length - 1 })
    const item = sortedCategoryKeys[itemIndex]

    const fileNamePrefix = faker.string.alphanumeric({ length: { min: 5, max: 8 }, casing: 'upper' })
    const fileNameSuffix = faker.string.alpha({ length: { min: 2, max: 3 }, casing: 'upper' })
    const fileName = `${fileNamePrefix}-${fileNameSuffix}`

    const isOneSize = isOneSizeFitsAll(item!)

    const quantityOfXS = isOneSize ? 0 : getRandomQuantity()
    const quantityOfSM = isOneSize ? 0 : getRandomQuantity()
    const quantityOfMD = isOneSize ? 0 : getRandomQuantity()
    const quantityOfLG = isOneSize ? 0 : getRandomQuantity()
    const quantityOfXL = isOneSize ? 0 : getRandomQuantity()
    const quantityOf2XL = isOneSize ? 0 : getRandomQuantity()
    const quantityOf3XL = isOneSize ? 0 : getRandomQuantity()
    const quantityOf4XL = isOneSize ? 0 : getRandomQuantity()
    const totalQuantity = isOneSize ? faker.number.int({ min: 1, max: 100 }) : quantityOfXS + quantityOfSM + quantityOfMD + quantityOfLG + quantityOfXL + quantityOf2XL + quantityOf3XL + quantityOf4XL

    const unitPrice = getRandomUnitPrice()
    const subtotal = totalQuantity * unitPrice

    return {
        item: item,
        fileName: fileName,
        style: faker.string.alphanumeric({ length: { min: 3, max: 7 }, casing: 'upper' }),
        color: faker.color.human().toUpperCase().replace(' ', '.'),
        mockupImageUrl: faker.image.url(),
        notes: faker.lorem.sentence(),
        quantityOfXS: quantityOfXS,
        quantityOfSM: quantityOfSM,
        quantityOfMD: quantityOfMD,
        quantityOfLG: quantityOfLG,
        quantityOfXL: quantityOfXL,
        quantityOf2XL: quantityOf2XL,
        quantityOf3XL: quantityOf3XL,
        quantityOf4XL: quantityOf4XL,
        totalQuantity: totalQuantity,
        unitPrice: unitPrice,
        subtotal: subtotal,
        receivedXS: false,
        receivedSM: false,
        receivedMD: false,
        receivedLG: false,
        receivedXL: false,
        received2XL: false,
        received3XL: false,
        received4XL: false,
        printedXS: false,
        printedSM: false,
        printedMD: false,
        printedLG: false,
        printedXL: false,
        printed2XL: false,
        printed3XL: false,
        printed4XL: false,
        countedXS: false,
        countedSM: false,
        countedMD: false,
        countedLG: false,
        countedXL: false,
        counted2XL: false,
        counted3XL: false,
        counted4XL: false,
    }
}

export function createManyProductSeeds(numberOfProducts: number): Prisma.SalesOrderProductCreateManyInput[] {
    return Array.from({ length: numberOfProducts }, () => createProductSeed())
}
