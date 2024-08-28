import Image from 'next/image'
import { SalesOrderProduct } from '@prisma/client'

type Props = {
    product: SalesOrderProduct
}

export function ProductProofDetail({ product }: Props) {
    return (
        <div className="relative size-96 m-4 justify-self-center border rounded-large overflow-hidden">
            <div className="grid grid-cols-3 grid-rows-6 h-full">
                <div className="row-span-5 flex flex-col p-2">
                    <div className="pb-2">
                        <div className="flex items-center justify-center h-16 w-full bg-default-200 rounded-medium">
                            <p className="text-2xl font-bold">
                                {product.totalQuantity}
                            </p>
                        </div>
                    </div>
                    {product.quantityOfXS > 0 && <ProductSizeQuantity title="XS" quantity={product.quantityOfXS} />}
                    {product.quantityOfSM > 0 && <ProductSizeQuantity title="SM" quantity={product.quantityOfSM} />}
                    {product.quantityOfMD > 0 && <ProductSizeQuantity title="MD" quantity={product.quantityOfMD} />}
                    {product.quantityOfLG > 0 && <ProductSizeQuantity title="LG" quantity={product.quantityOfLG} />}
                    {product.quantityOfXL > 0 && <ProductSizeQuantity title="XL" quantity={product.quantityOfXL} />}
                    {product.quantityOf2XL > 0 && <ProductSizeQuantity title="2XL" quantity={product.quantityOf2XL} />}
                    {product.quantityOf3XL > 0 && <ProductSizeQuantity title="3XL" quantity={product.quantityOf3XL} />}
                    {product.quantityOf4XL > 0 && <ProductSizeQuantity title="4XL" quantity={product.quantityOf4XL} />}
                </div>
                <div className="row-start-6 col-span-3 flex items-center justify-center border-t">
                    <p className="font-bold">
                        {product.item}-{product.fileName}-{product.style}-{product.color}
                    </p>
                </div>
                <div className="relative col-start-2 col-span-2 row-span-5">
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
