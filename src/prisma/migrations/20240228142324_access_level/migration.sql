/*
  Warnings:

  - You are about to drop the column `practitioner` on the `appointment` table. All the data in the column will be lost.
  - You are about to drop the column `practitioners` on the `hospital` table. All the data in the column will be lost.
  - You are about to drop the column `practitioners` on the `specialisation` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `practitionerId` to the `appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "access" AS ENUM ('super_admin', 'admin', 'patient', 'practitioner');

-- DropIndex
DROP INDEX "appointment_practitioner_index";

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "practitioner",
ADD COLUMN     "patientId" TEXT NOT NULL,
ADD COLUMN     "practitionerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "hospital" DROP COLUMN "practitioners";

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "access_level" "access" DEFAULT 'patient';

-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "access_level" "access" DEFAULT 'practitioner';

-- AlterTable
ALTER TABLE "specialisation" DROP COLUMN "practitioners";

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_level" "access" DEFAULT 'admin',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "service_id_key" ON "service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- CreateIndex
CREATE INDEX "appointment_practitionerId_index" ON "appointment"("practitionerId");

-- CreateIndex
CREATE INDEX "appointment_patientId_index" ON "appointment"("patientId");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
