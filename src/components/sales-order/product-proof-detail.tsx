import { type SalesOrderProduct } from '@prisma/client'
import Image from 'next/image'

type Props = {
    product: SalesOrderProduct
}

export function ProductProofDetail({ product }: Props) {
    return (
        <div className="relative m-4 size-96 justify-self-center overflow-hidden rounded-large border">
            <div className="grid h-full grid-cols-3 grid-rows-6">
                <div className="row-span-5 flex flex-col p-2">
                    <div className="pb-2">
                        <div className="flex h-16 w-full items-center justify-center rounded-medium bg-default-200">
                            <p className="text-2xl font-bold">{product.totalQuantity}</p>
                        </div>
                    </div>
                    {product.quantityOfXS > 0 && (
                        <ProductSizeQuantity
                            title="XS"
                            quantity={product.quantityOfXS}
                        />
                    )}
                    {product.quantityOfSM > 0 && (
                        <ProductSizeQuantity
                            title="SM"
                            quantity={product.quantityOfSM}
                        />
                    )}
                    {product.quantityOfMD > 0 && (
                        <ProductSizeQuantity
                            title="MD"
                            quantity={product.quantityOfMD}
                        />
                    )}
                    {product.quantityOfLG > 0 && (
                        <ProductSizeQuantity
                            title="LG"
                            quantity={product.quantityOfLG}
                        />
                    )}
                    {product.quantityOfXL > 0 && (
                        <ProductSizeQuantity
                            title="XL"
                            quantity={product.quantityOfXL}
                        />
                    )}
                    {product.quantityOf2XL > 0 && (
                        <ProductSizeQuantity
                            title="2XL"
                            quantity={product.quantityOf2XL}
                        />
                    )}
                    {product.quantityOf3XL > 0 && (
                        <ProductSizeQuantity
                            title="3XL"
                            quantity={product.quantityOf3XL}
                        />
                    )}
                    {product.quantityOf4XL > 0 && (
                        <ProductSizeQuantity
                            title="4XL"
                            quantity={product.quantityOf4XL}
                        />
                    )}
                </div>
                <div className="col-span-3 row-start-6 flex items-center justify-center border-t">
                    <p className="font-bold">
                        {product.item}-{product.fileName}-{product.style}-{product.color}
                    </p>
                </div>
                <div className="relative col-span-2 col-start-2 row-span-5">
                    <Image
                        src={product.mockupImageUrl!}
                        alt="Mockup Image"
                        className="object-contain"
                        fill
                    />
                </div>
            </div>
        </div>
    )
}

type ProductSizeQuantityProps = {
    title: string
    quantity: number
}

function ProductSizeQuantity({ title, quantity }: ProductSizeQuantityProps) {
    return (
        <div className="flex justify-between">
            <p>{title}</p>
            <p>{quantity}</p>
        </div>
    )
}
