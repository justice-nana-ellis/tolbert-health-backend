/*
  Warnings:

  - You are about to drop the `WorkingHours` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkingHours" DROP CONSTRAINT "WorkingHours_practitionerId_fkey";

-- DropTable
DROP TABLE "WorkingHours";

-- CreateTable
CREATE TABLE "workhours" (
    "id" TEXT NOT NULL,
    "day" "days" NOT NULL DEFAULT 'monday',
    "available" BOOLEAN NOT NULL DEFAULT true,
    "practitionerId" TEXT,
    "startTime" TEXT NOT NULL DEFAULT '06:00:00',
    "closeTime" TEXT NOT NULL DEFAULT '04:00:00',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "workhours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workhours" ADD CONSTRAINT "workhours_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
