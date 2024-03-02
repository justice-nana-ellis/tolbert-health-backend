/*
  Warnings:

  - You are about to drop the column `service` on the `appointment` table. All the data in the column will be lost.
  - Added the required column `hospitalId` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `hospital` table without a default value. This is not possible if the table is not empty.
  - Made the column `updated_at` on table `hospital` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `specialisation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `specialisation` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "days" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- DropForeignKey
ALTER TABLE "practitioner" DROP CONSTRAINT "practitioner_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "practitioner" DROP CONSTRAINT "practitioner_specialisationId_fkey";

-- DropIndex
DROP INDEX "appointment_patientId_index";

-- DropIndex
DROP INDEX "appointment_practitionerId_index";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "service",
ADD COLUMN     "hospitalId" TEXT NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "hospital" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "city" TEXT,
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "city" TEXT,
ADD COLUMN     "zip" TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "hospitalId" DROP NOT NULL,
ALTER COLUMN "specialisationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "service" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "specialisation" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "practitionerhospitalspecialisation" (
    "practitionerId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "specialisationId" TEXT NOT NULL,

    CONSTRAINT "practitionerhospitalspecialisation_pkey" PRIMARY KEY ("practitionerId","hospitalId","specialisationId")
);

-- AddForeignKey
ALTER TABLE "practitioner" ADD CONSTRAINT "practitioner_specialisationId_fkey" FOREIGN KEY ("specialisationId") REFERENCES "specialisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitioner" ADD CONSTRAINT "practitioner_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitionerhospitalspecialisation" ADD CONSTRAINT "practitionerhospitalspecialisation_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitionerhospitalspecialisation" ADD CONSTRAINT "practitionerhospitalspecialisation_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitionerhospitalspecialisation" ADD CONSTRAINT "practitionerhospitalspecialisation_specialisationId_fkey" FOREIGN KEY ("specialisationId") REFERENCES "specialisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
