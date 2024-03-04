-- AlterTable
ALTER TABLE "admin" ADD COLUMN     "deleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "appointment" ADD COLUMN     "deleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "hospital" ADD COLUMN     "deleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "deleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "payment" ADD COLUMN     "deleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "deleted" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "specialisation" ADD COLUMN     "deleted" BOOLEAN DEFAULT false;
