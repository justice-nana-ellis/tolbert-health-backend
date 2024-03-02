/*
  Warnings:

  - Added the required column `licence_number` to the `practitioner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "licence_number" TEXT NOT NULL;
