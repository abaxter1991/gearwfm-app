-- CreateEnum
CREATE TYPE "SalesOrderStatus" AS ENUM ('NEW_ORDER', 'DESIGN', 'PRODUCTION');

-- CreateTable
CREATE TABLE "SalesOrders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,
    "status" "SalesOrderStatus" NOT NULL DEFAULT 'NEW_ORDER',
    "is_draft" BOOLEAN NOT NULL DEFAULT true,
    "is_new_customer" BOOLEAN NOT NULL DEFAULT false,
    "external_id" TEXT,
    "sales_rep_name" TEXT,
    "customer_service_rep_name" TEXT,
    "company_name" TEXT,
    "contact_name" TEXT,
    "phone_number" TEXT,
    "email_address" TEXT,
    "shipping_address" TEXT,
    "billing_address" TEXT,
    "notes" TEXT,
    "discount" INTEGER NOT NULL,
    "shipping_price" DOUBLE PRECISION NOT NULL,
    "grand_total" DOUBLE PRECISION NOT NULL,
    "approved_proof" BOOLEAN NOT NULL DEFAULT false,
    "parts_ordered" BOOLEAN NOT NULL DEFAULT false,
    "parts_received" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SalesOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesOrderProducts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "item" TEXT,
    "file_name" TEXT,
    "style" TEXT,
    "color" TEXT,
    "mockup_image_url" TEXT,
    "notes" TEXT,
    "quantity_of_xs" INTEGER NOT NULL,
    "quantity_of_sm" INTEGER NOT NULL,
    "quantity_of_md" INTEGER NOT NULL,
    "quantity_of_lg" INTEGER NOT NULL,
    "quantity_of_xl" INTEGER NOT NULL,
    "quantity_of_2xl" INTEGER NOT NULL,
    "quantity_of_3xl" INTEGER NOT NULL,
    "quantity_of_4xl" INTEGER NOT NULL,
    "total_quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "sales_order_id" TEXT,

    CONSTRAINT "SalesOrderProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesOrderAssembledProducts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "item" TEXT NOT NULL,
    "all_assembled" BOOLEAN NOT NULL DEFAULT false,
    "sales_order_id" TEXT,

    CONSTRAINT "SalesOrderAssembledProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SalesOrderProducts" ADD CONSTRAINT "SalesOrderProducts_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "SalesOrders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOrderAssembledProducts" ADD CONSTRAINT "SalesOrderAssembledProducts_sales_order_id_fkey" FOREIGN KEY ("sales_order_id") REFERENCES "SalesOrders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
