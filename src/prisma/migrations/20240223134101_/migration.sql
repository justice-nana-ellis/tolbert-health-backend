/*
  Warnings:

  - You are about to drop the column `appointments` on the `practitioner` table. All the data in the column will be lost.
  - Added the required column `practitioner` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_practitionerId_fkey";

-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "practitioner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "practitioner" DROP COLUMN "appointments";

-- CreateIndex
CREATE INDEX "appointment_practitionerId_index" ON "appointment"("practitionerId");
