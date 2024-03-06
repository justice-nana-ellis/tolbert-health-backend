-- AlterTable
ALTER TABLE "appointment" ALTER COLUMN "tc" DROP NOT NULL,
ALTER COLUMN "tc" SET DEFAULT false;
