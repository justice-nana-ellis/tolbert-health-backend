/*
  Warnings:

  - You are about to drop the column `practitioner` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practitionerId` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "appointment_practitioner_index";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "practitioner",
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "practitionerId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "appointment_practitionerId_index" ON "appointment"("practitionerId");

-- CreateIndex
CREATE INDEX "appointment_patientId_index" ON "appointment"("patientId");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
