/*
  Warnings:

  - Added the required column `otp_code` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "otp_code" TEXT NOT NULL;
