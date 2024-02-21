/*
  Warnings:

  - Made the column `verified` on table `patient` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('payment_completed', 'rejected');

-- CreateEnum
CREATE TYPE "indentity_card" AS ENUM ('GHANA_CARD', 'VOTER_ID', 'PASSPORT', 'DRIVING_LICENCE');

-- AlterTable
ALTER TABLE "patient" ALTER COLUMN "verified" SET NOT NULL,
ALTER COLUMN "verified" SET DEFAULT false;

-- CreateTable
CREATE TABLE "practitioner" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "pob" TIMESTAMP(3) NOT NULL,
    "digital_address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "id_type" "indentity_card" NOT NULL DEFAULT 'GHANA_CARD',
    "id_number" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "licence_number" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "practitioner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "specialisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "practitionerId" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "tc" BOOLEAN NOT NULL,
    "payment_completed" BOOLEAN NOT NULL,
    "status" "status" NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_practitionerTospecialisation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_hospitalTopractitioner" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "practitioner_id_key" ON "practitioner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "practitioner_email_key" ON "practitioner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "specialisation_id_key" ON "specialisation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "specialisation_name_key" ON "specialisation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_id_key" ON "hospital"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_name_key" ON "hospital"("name");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_id_key" ON "appointment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_title_key" ON "appointment"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_practitionerTospecialisation_AB_unique" ON "_practitionerTospecialisation"("A", "B");

-- CreateIndex
CREATE INDEX "_practitionerTospecialisation_B_index" ON "_practitionerTospecialisation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_hospitalTopractitioner_AB_unique" ON "_hospitalTopractitioner"("A", "B");

-- CreateIndex
CREATE INDEX "_hospitalTopractitioner_B_index" ON "_hospitalTopractitioner"("B");

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_practitionerTospecialisation" ADD CONSTRAINT "_practitionerTospecialisation_A_fkey" FOREIGN KEY ("A") REFERENCES "practitioner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_practitionerTospecialisation" ADD CONSTRAINT "_practitionerTospecialisation_B_fkey" FOREIGN KEY ("B") REFERENCES "specialisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hospitalTopractitioner" ADD CONSTRAINT "_hospitalTopractitioner_A_fkey" FOREIGN KEY ("A") REFERENCES "hospital"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hospitalTopractitioner" ADD CONSTRAINT "_hospitalTopractitioner_B_fkey" FOREIGN KEY ("B") REFERENCES "practitioner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
