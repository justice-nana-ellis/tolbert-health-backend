/*
  Warnings:

  - You are about to drop the `_hospitalTopractitioner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_practitionerTospecialisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_hospitalTopractitioner" DROP CONSTRAINT "_hospitalTopractitioner_A_fkey";

-- DropForeignKey
ALTER TABLE "_hospitalTopractitioner" DROP CONSTRAINT "_hospitalTopractitioner_B_fkey";

-- DropForeignKey
ALTER TABLE "_practitionerTospecialisation" DROP CONSTRAINT "_practitionerTospecialisation_A_fkey";

-- DropForeignKey
ALTER TABLE "_practitionerTospecialisation" DROP CONSTRAINT "_practitionerTospecialisation_B_fkey";

-- AlterTable
ALTER TABLE "hospital" ADD COLUMN     "practitioners" TEXT[];

-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "appointments" TEXT[],
ADD COLUMN     "hospitals" TEXT[],
ADD COLUMN     "specialisations" TEXT[];

-- AlterTable
ALTER TABLE "specialisation" ADD COLUMN     "practitioners" TEXT[];

-- DropTable
DROP TABLE "_hospitalTopractitioner";

-- DropTable
DROP TABLE "_practitionerTospecialisation";
