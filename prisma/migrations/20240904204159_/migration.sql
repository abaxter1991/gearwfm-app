-- CreateEnum
CREATE TYPE "SalesOrderStatus" AS ENUM ('NEW_ORDER', 'DESIGN', 'PRODUCTION');

-- CreateTable
CREATE TABLE "SalesOrders" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '',
    "status" "SalesOrderStatus" NOT NULL DEFAULT 'NEW_ORDER',
    "is_draft" BOOLEAN NOT NULL DEFAULT true,
    "is_new_customer" BOOLEAN NOT NULL DEFAULT false,
    "external_id" TEXT NOT NULL DEFAULT '',
    "reference_id" TEXT NOT NULL DEFAULT '',
    "sales_rep_name" TEXT NOT NULL DEFAULT '',
    "sales_rep_email_address" TEXT NOT NULL DEFAULT '',
    "customer_service_rep_name" TEXT NOT NULL DEFAULT '',
    "company_name" TEXT NOT NULL DEFAULT '',
    "contact_name" TEXT NOT NULL DEFAULT '',
    "phone_number" TEXT NOT NULL DEFAULT '',
    "email_address" TEXT NOT NULL DEFAULT '',
    "shipping_address" TEXT NOT NULL DEFAULT '',
    "billing_address" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "tracking_number" TEXT NOT NULL DEFAULT '',
    "discount" INTEGER NOT NULL DEFAULT 0,
    "shipping_price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "grand_total" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
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
    "item" TEXT NOT NULL DEFAULT '',
    "file_name" TEXT NOT NULL DEFAULT '',
    "style" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '',
    "mockup_image_url" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "quantity_of_xs" INTEGER NOT NULL DEFAULT 0,
    "quantity_of_sm" INTEGER NOT NULL DEFAULT 0,
    "quantity_of_md" INTEGER NOT NULL DEFAULT 0,
    "quantity_of_lg" INTEGER NOT NULL DEFAULT 0,
    "quantity_of_xl" INTEGER NOT NULL DEFAULT 0,
    "quantity_of_2xl" INTEGER NOT NULL DEFAULT 0,
    "quantity_of_3xl" INTEGER NOT NULL DEFAULT 0,
    "quantity_of_4xl" INTEGER NOT NULL DEFAULT 0,
    "total_quantity" INTEGER NOT NULL DEFAULT 0,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
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
