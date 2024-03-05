/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `otp` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `otp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "otp" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "otp_email_key" ON "otp"("email");
