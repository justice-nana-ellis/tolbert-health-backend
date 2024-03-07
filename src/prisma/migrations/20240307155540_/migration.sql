/*
  Warnings:

  - You are about to drop the column `hospitalId` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `time` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_hospitalId_fkey";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "hospitalId",
ADD COLUMN     "time" TEXT NOT NULL;
