-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "longitude" TEXT;

-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "location" TEXT,
ALTER COLUMN "img_url" DROP NOT NULL;
