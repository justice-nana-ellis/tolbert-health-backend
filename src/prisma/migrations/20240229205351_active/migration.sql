-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;
