const xsField = { label: 'XS', name: 'quantityOfXS' }
const smField = { label: 'SM', name: 'quantityOfSM' }
const mdField = { label: 'MD', name: 'quantityOfMD' }
const lgField = { label: 'LG', name: 'quantityOfLG' }
const xlField = { label: 'XL', name: 'quantityOfXL' }
const xl2Field = { label: '2XL', name: 'quantityOf2XL' }
const xl3Field = { label: '3XL', name: 'quantityOf3XL' }
const xl4Field = { label: '4XL', name: 'quantityOf4XL' }

const defaultSizeFields = {
    XS: { ...xsField, show: false },
    SM: { ...smField, show: false },
    MD: { ...mdField, show: false },
    LG: { ...lgField, show: false },
    XL: { ...xlField, show: false },
    XL2: { ...xl2Field, show: false },
    XL3: { ...xl3Field, show: false },
    XL4: { ...xl4Field, show: false },
}

export const productCategories = [
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
        key: 'GTR',
        label: 'Gaiter',
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
        key: 'BNE',
        label: 'Beanie',
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
        key: 'SCK',
        label: 'Socks',
        group: 'Foot Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
    {
        key: 'YSCK',
        label: 'Youth Socks',
        group: 'Foot Gear',
        sizeFields: {
            ...defaultSizeFields,
        },
    },
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
]