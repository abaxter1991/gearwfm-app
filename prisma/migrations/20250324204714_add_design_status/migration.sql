/*
  Warnings:

  - The values [IN_DESIGN] on the enum `SalesOrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SalesOrderStatus_new" AS ENUM ('QUOTE', 'DRAFT', 'DESIGN_REVIEW', 'PENDING', 'IN_PRODUCTION', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "SalesOrders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "SalesOrders" ALTER COLUMN "status" TYPE "SalesOrderStatus_new" USING ("status"::text::"SalesOrderStatus_new");
ALTER TYPE "SalesOrderStatus" RENAME TO "SalesOrderStatus_old";
ALTER TYPE "SalesOrderStatus_new" RENAME TO "SalesOrderStatus";
DROP TYPE "SalesOrderStatus_old";
ALTER TABLE "SalesOrders" ALTER COLUMN "status" SET DEFAULT 'QUOTE';
COMMIT;

-- AlterTable
ALTER TABLE "SalesOrders" ALTER COLUMN "status" SET DEFAULT 'QUOTE';
