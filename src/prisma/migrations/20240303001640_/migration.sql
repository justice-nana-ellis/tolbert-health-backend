/*
  Warnings:

  - Added the required column `serviceId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "statuses" ADD VALUE 'postponed';

-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
