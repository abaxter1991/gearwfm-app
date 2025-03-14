import type { ProductCategory, SizeField, SizeFields } from '~/types'

const xsField: SizeField = { label: 'XS', name: 'quantityOfXS', receivedFieldName: 'receivedXS' }
const smField: SizeField = { label: 'SM', name: 'quantityOfSM', receivedFieldName: 'receivedSM' }
const mdField: SizeField = { label: 'MD', name: 'quantityOfMD', receivedFieldName: 'receivedMD' }
const lgField: SizeField = { label: 'LG', name: 'quantityOfLG', receivedFieldName: 'receivedLG' }
const xlField: SizeField = { label: 'XL', name: 'quantityOfXL', receivedFieldName: 'receivedXL' }
const xl2Field: SizeField = { label: '2XL', name: 'quantityOf2XL', receivedFieldName: 'received2XL' }
const xl3Field: SizeField = { label: '3XL', name: 'quantityOf3XL', receivedFieldName: 'received3XL' }
const xl4Field: SizeField = { label: '4XL', name: 'quantityOf4XL', receivedFieldName: 'received4XL' }

const defaultSizeFields: SizeFields = {
    XS: { ...xsField, show: false },
    SM: { ...smField, show: false },
    MD: { ...mdField, show: false },
    LG: { ...lgField, show: false },
    XL: { ...xlField, show: false },
    XL2: { ...xl2Field, show: false },
    XL3: { ...xl3Field, show: false },
    XL4: { ...xl4Field, show: false },
}

export const productCategories: ProductCategory[] = [
    {
        key: 'TEE',
        label: 'T-Shirt',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YTEE',
        label: 'Youth T-Shirt',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'HDE',
        label: 'Hoodie',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YHDE',
        label: 'Youth Hoodie',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'SWC',
        label: 'Sweatshirt Crew',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YSWC',
        label: 'Youth Sweatshirt Crew',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'POLO',
        label: 'Polo',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YPOLO',
        label: 'Youth Polo',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'PNT',
        label: 'Pants or Leggings',
        group: 'Leg Wear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YPNT',
        label: 'Youth Pants or Leggings',
        group: 'Leg Wear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'SHT',
        label: 'Shorts',
        group: 'Leg Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YSHT',
        label: 'Youth Shorts',
        group: 'Leg Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'LTEE',
        label: 'Long Sleeve T-Shirt',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YLTEE',
        label: 'Youth Long Sleeve T-Shirt',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'HAT',
        label: 'Hat',
        group: 'Head Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'YHAT',
        label: 'Youth Hat',
        group: 'Head Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'SCK',
        label: 'Socks',
        group: 'Foot Gear',
        sizeFields: {
            ...defaultSizeFields,
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
        },
    },
    {
        key: 'YSCK',
        label: 'Youth Socks',
        group: 'Foot Gear',
        sizeFields: {
            ...defaultSizeFields,
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
        },
    },
    {
        key: 'QZ',
        label: 'Quarter Zip Pullover',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'JKT',
        label: 'Jacket',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'YJKT',
        label: 'Youth Jacket',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'BAG',
        label: 'Bag',
        group: 'Other Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'BNE',
        label: 'Beanie',
        group: 'Head Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'GTR',
        label: 'Gaiter',
        group: 'Head Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'STR.LG',
        label: 'Lifeguard Hat',
        group: 'Head Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'STR.CB',
        label: 'Straw Cowboy Hat',
        group: 'Head Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'VSR',
        label: 'Visor',
        group: 'Head Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'TNK',
        label: 'Tank Top',
        group: 'Upper Gear',
        sizeFields: {
            ...defaultSizeFields,
            XS: { ...xsField, show: true },
            SM: { ...smField, show: true },
            MD: { ...mdField, show: true },
            LG: { ...lgField, show: true },
            XL: { ...xlField, show: true },
            XL2: { ...xl2Field, show: true },
            XL3: { ...xl3Field, show: true },
            XL4: { ...xl4Field, show: true },
        },
    },
    {
        key: 'PTCH',
        label: 'Patch',
        group: 'Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'STKR',
        label: 'Sticker',
        group: 'Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'MGNT',
        label: 'Magnet',
        group: 'Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'MUG',
        label: 'Mug',
        group: 'Other Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'KEY',
        label: 'Keychain',
        group: 'Other Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
]

export const sortedCategoryKeys = productCategories.map((productCategory) => productCategory.key)

export function isOneSizeFitsAll(key: string) {
    const sizeFields = productCategories.find((category) => category.key === key)?.sizeFields

    if (sizeFields) {
        let response = true

        Object.values(sizeFields).forEach((sizeField) => {
            if (sizeField.show) {
                response = false
            }
        })

        return response
    }

    return true
}

