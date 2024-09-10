-- AlterTable
ALTER TABLE "SalesOrders" ADD COLUMN     "products_counted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "products_shipped" BOOLEAN NOT NULL DEFAULT false;
