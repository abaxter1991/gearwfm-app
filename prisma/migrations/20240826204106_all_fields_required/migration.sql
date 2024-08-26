/*
  Warnings:

  - Made the column `item` on table `SalesOrderProducts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `file_name` on table `SalesOrderProducts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `style` on table `SalesOrderProducts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `SalesOrderProducts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mockup_image_url` on table `SalesOrderProducts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notes` on table `SalesOrderProducts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `external_id` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sales_rep_name` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customer_service_rep_name` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company_name` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_name` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email_address` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shipping_address` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `billing_address` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `notes` on table `SalesOrders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SalesOrderProducts" ALTER COLUMN "item" SET NOT NULL,
ALTER COLUMN "item" SET DEFAULT '',
ALTER COLUMN "file_name" SET NOT NULL,
ALTER COLUMN "file_name" SET DEFAULT '',
ALTER COLUMN "style" SET NOT NULL,
ALTER COLUMN "style" SET DEFAULT '',
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "color" SET DEFAULT '',
ALTER COLUMN "mockup_image_url" SET NOT NULL,
ALTER COLUMN "mockup_image_url" SET DEFAULT '',
ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "notes" SET DEFAULT '',
ALTER COLUMN "quantity_of_xs" SET DEFAULT 0,
ALTER COLUMN "quantity_of_sm" SET DEFAULT 0,
ALTER COLUMN "quantity_of_md" SET DEFAULT 0,
ALTER COLUMN "quantity_of_lg" SET DEFAULT 0,
ALTER COLUMN "quantity_of_xl" SET DEFAULT 0,
ALTER COLUMN "quantity_of_2xl" SET DEFAULT 0,
ALTER COLUMN "quantity_of_3xl" SET DEFAULT 0,
ALTER COLUMN "quantity_of_4xl" SET DEFAULT 0,
ALTER COLUMN "total_quantity" SET DEFAULT 0,
ALTER COLUMN "unit_price" SET DEFAULT 0.00,
ALTER COLUMN "subtotal" SET DEFAULT 0.00;

-- AlterTable
ALTER TABLE "SalesOrders" ADD COLUMN     "reference_id" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "user_id" SET DEFAULT '',
ALTER COLUMN "external_id" SET NOT NULL,
ALTER COLUMN "external_id" SET DEFAULT '',
ALTER COLUMN "sales_rep_name" SET NOT NULL,
ALTER COLUMN "sales_rep_name" SET DEFAULT '',
ALTER COLUMN "customer_service_rep_name" SET NOT NULL,
ALTER COLUMN "customer_service_rep_name" SET DEFAULT '',
ALTER COLUMN "company_name" SET NOT NULL,
ALTER COLUMN "company_name" SET DEFAULT '',
ALTER COLUMN "contact_name" SET NOT NULL,
ALTER COLUMN "contact_name" SET DEFAULT '',
ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "phone_number" SET DEFAULT '',
ALTER COLUMN "email_address" SET NOT NULL,
ALTER COLUMN "email_address" SET DEFAULT '',
ALTER COLUMN "shipping_address" SET NOT NULL,
ALTER COLUMN "shipping_address" SET DEFAULT '',
ALTER COLUMN "billing_address" SET NOT NULL,
ALTER COLUMN "billing_address" SET DEFAULT '',
ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "notes" SET DEFAULT '',
ALTER COLUMN "discount" SET DEFAULT 0,
ALTER COLUMN "shipping_price" SET DEFAULT 0.00,
ALTER COLUMN "grand_total" SET DEFAULT 0.00;
