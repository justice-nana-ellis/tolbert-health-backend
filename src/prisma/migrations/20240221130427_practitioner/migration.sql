/*
  Warnings:

  - The values [payment_completed] on the enum `status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_new" AS ENUM ('approved', 'rejected');
ALTER TABLE "appointment" ALTER COLUMN "status" TYPE "status_new" USING ("status"::text::"status_new");
ALTER TYPE "status" RENAME TO "status_old";
ALTER TYPE "status_new" RENAME TO "status";
DROP TYPE "status_old";
COMMIT;

-- AlterTable
ALTER TABLE "practitioner" ALTER COLUMN "pob" SET DATA TYPE TEXT;
