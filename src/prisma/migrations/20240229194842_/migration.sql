/*
  Warnings:

  - You are about to drop the column `hospitals` on the `practitioner` table. All the data in the column will be lost.
  - You are about to drop the column `licence_number` on the `practitioner` table. All the data in the column will be lost.
  - You are about to drop the column `specialisations` on the `practitioner` table. All the data in the column will be lost.
  - Added the required column `hospitalId` to the `practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specialisationId` to the `practitioner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "practitioner" DROP COLUMN "hospitals",
DROP COLUMN "licence_number",
DROP COLUMN "specialisations",
ADD COLUMN     "hospitalId" TEXT NOT NULL,
ADD COLUMN     "specialisationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "practitioner" ADD CONSTRAINT "practitioner_specialisationId_fkey" FOREIGN KEY ("specialisationId") REFERENCES "specialisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitioner" ADD CONSTRAINT "practitioner_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
