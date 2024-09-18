-- AlterTable
ALTER TABLE "SalesOrders" ADD COLUMN     "arhived_reason" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false;
