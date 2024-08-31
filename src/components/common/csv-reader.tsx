import { useState } from 'react'
import { cn } from '@/lib/utils'

import {
    useCSVReader,
    lightenDarkenColor,
    formatFileSize,
} from 'react-papaparse'

const DEFAULT_REMOVE_HOVER_COLOR = '#A01919'
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
)

type Props = {
    onCsvLoaded?: (csvData: any) => void,
}

export function CsvReader({ onCsvLoaded }: Props) {
    const { CSVReader } = useCSVReader()

    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR
    )

    return (
        <CSVReader
            onUploadAccepted={(results: any) => {
                console.log('---------------------------')
                console.log(results)
                console.log('---------------------------')

                const testData = [
                    {
                        "unique_name": "Badger Sport Adult Trainer Pant-Black",
                        "product_name": "Badger Sport Adult Trainer Pant",
                        "item": "PNT",
                        "fileName": "",
                        "style": "1575",
                        "color": "Black",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 4,
                        "quantityOfMD": 2,
                        "quantityOfLG": 3,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 9,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Badger Sport B-Core L/S Hood Tee-Black",
                        "product_name": "Badger Sport B-Core L/S Hood Tee",
                        "item": "TEE",
                        "fileName": "",
                        "style": "410500",
                        "color": "Black",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 1,
                        "quantityOfMD": 1,
                        "quantityOfLG": 1,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 3,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Badger Sport B-Core L/S Hood Tee-Silver",
                        "product_name": "Badger Sport B-Core L/S Hood Tee",
                        "item": "TEE",
                        "fileName": "",
                        "style": "410500",
                        "color": "Silver",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 0,
                        "quantityOfXL": 1,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 1,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Bella + Canvas Unisex Jersey Short Sleeve  Premium Tee-Black",
                        "product_name": "Bella + Canvas Unisex Jersey Short Sleeve  Premium Tee",
                        "item": "TEE",
                        "fileName": "",
                        "style": "3001",
                        "color": "Black",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 0,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 0,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Bella + Canvas Unisex Jersey Short Sleeve  Premium Tee-Silver",
                        "product_name": "Bella + Canvas Unisex Jersey Short Sleeve  Premium Tee",
                        "item": "TEE",
                        "fileName": "",
                        "style": "3001",
                        "color": "Silver",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 1,
                        "quantityOfXL": 1,
                        "quantityOf2XL": 2,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 4,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Bella + Canvas Womens The Favorite Tee-Black Heather",
                        "product_name": "Bella + Canvas Womens The Favorite Tee",
                        "item": "TEE",
                        "fileName": "",
                        "style": "BC6004",
                        "color": "Black Heather",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 1,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 1,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 2,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Gildan Adult Heavy Blend Crew Neck Sweatshirt-Black",
                        "product_name": "Gildan Adult Heavy Blend Crew Neck Sweatshirt",
                        "item": "SWC",
                        "fileName": "",
                        "style": "GILD1800",
                        "color": "Black",
                        "mockupImageUrl": "",
                        "notes": "MD",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 0,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 2,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Gildan Adult Heavy Blend Crew Neck Sweatshirt-Sport Grey",
                        "product_name": "Gildan Adult Heavy Blend Crew Neck Sweatshirt",
                        "item": "SWC",
                        "fileName": "",
                        "style": "GILD1800",
                        "color": "Sport Grey",
                        "mockupImageUrl": "",
                        "notes": "MD",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 0,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 1,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Next Level Unisex Cotton T-Shirt-Cardinal",
                        "product_name": "Next Level Unisex Cotton T-Shirt",
                        "item": "TEE",
                        "fileName": "",
                        "style": "3600",
                        "color": "Cardinal",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 1,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 1,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 2,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Pacific Headwear Basic Knit Beanie-Black",
                        "product_name": "Pacific Headwear Basic Knit Beanie",
                        "item": "BNE",
                        "fileName": "",
                        "style": "601K",
                        "color": "Black",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 1,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 1,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Port & Company Core Blend Tee-Jet Black",
                        "product_name": "Port & Company Core Blend Tee",
                        "item": "TEE",
                        "fileName": "",
                        "style": "PC55",
                        "color": "Jet Black",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 1,
                        "quantityOfLG": 1,
                        "quantityOfXL": 1,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 3,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Port & Company Core Blend Tee-Athletic Heather",
                        "product_name": "Port & Company Core Blend Tee",
                        "item": "TEE",
                        "fileName": "",
                        "style": "PC55",
                        "color": "Athletic Heather",
                        "mockupImageUrl": "",
                        "notes": "",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 0,
                        "quantityOfXL": 1,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 1,
                        "unitPrice": 0,
                        "subtotal": 0
                    },
                    {
                        "unique_name": "Sport-Tek Ladies Sport-Wick Textured Colorblock 1/4-Zip Pullover-White/Iron Grey",
                        "product_name": "Sport-Tek Ladies Sport-Wick Textured Colorblock 1/4-Zip Pullover",
                        "item": "QZ",
                        "fileName": "",
                        "style": "LST861",
                        "color": "White/Iron Grey",
                        "mockupImageUrl": "",
                        "notes": "LG",
                        "quantityOfXS": 0,
                        "quantityOfSM": 0,
                        "quantityOfMD": 0,
                        "quantityOfLG": 0,
                        "quantityOfXL": 0,
                        "quantityOf2XL": 0,
                        "quantityOf3XL": 0,
                        "quantityOf4XL": 0,
                        "totalQuantity": 1,
                        "unitPrice": 0,
                        "subtotal": 0
                    }
                ]

                if (onCsvLoaded) {
                    onCsvLoaded(testData)
                }
            }}
            onDragOver={(event: DragEvent) => {
                event.preventDefault()
            }}
            onDragLeave={(event: DragEvent) => {
                event.preventDefault()
            }}
        >
            {({
                getRootProps,
                getRemoveFileProps,
                acceptedFile,
                ProgressBar,
                Remove,
            }: any) => (
                <>
                    <div
                        {...getRootProps()}
                        className={cn(
                            'flex flex-col items-center gap-6',
                            'rounded-lg border border-dashed p-6 outline-0',
                            'transition duration-250 ease-in-out',
                        )}
                    >
                        {acceptedFile ? (
                            <>
                                <div className="relative flex flex-col justify-center size-28 z-10">
                                    <div className="flex flex-col items-center px-2.5">
                                        <p className="flex justify-center">
                                            {formatFileSize(acceptedFile.size)}
                                        </p>
                                        <p>
                                            {acceptedFile.name}
                                        </p>
                                    </div>
                                    <div className="absolute w-full px-2.5 bottom-3.5">
                                        <ProgressBar />
                                    </div>
                                    <div
                                        {...getRemoveFileProps()}
                                        className="absolute size-10 top-1.5 right-1.5"
                                        onMouseOver={(event: Event) => {
                                            event.preventDefault()
                                            setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT)
                                        }}
                                        onMouseOut={(event: Event) => {
                                            event.preventDefault()
                                            setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR)
                                        }}
                                    >
                                        <Remove color={removeHoverColor} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            'Drop CSV file here or click to upload'
                        )}
                    </div>
                </>
            )}
        </CSVReader>
    )
}
