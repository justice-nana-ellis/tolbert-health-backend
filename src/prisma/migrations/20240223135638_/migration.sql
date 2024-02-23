/*
  Warnings:

  - You are about to drop the column `practitionerId` on the `appointment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "appointment_practitionerId_index";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "practitionerId";

-- CreateIndex
CREATE INDEX "appointment_practitioner_index" ON "appointment"("practitioner");
