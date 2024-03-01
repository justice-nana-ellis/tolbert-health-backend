-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_hospitalId_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_practitionerId_fkey";

-- DropForeignKey
ALTER TABLE "appointment" DROP CONSTRAINT "appointment_serviceId_fkey";

-- AlterTable
ALTER TABLE "appointment" ALTER COLUMN "practitionerId" DROP NOT NULL,
ALTER COLUMN "patientId" DROP NOT NULL,
ALTER COLUMN "hospitalId" DROP NOT NULL,
ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
