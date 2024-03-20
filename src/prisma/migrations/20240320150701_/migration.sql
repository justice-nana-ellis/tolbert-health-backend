-- AlterTable
ALTER TABLE "service" ADD COLUMN     "practitionerId" TEXT;

-- CreateTable
CREATE TABLE "WorkingHours" (
    "id" TEXT NOT NULL,
    "day" "days" NOT NULL DEFAULT 'monday',
    "available" BOOLEAN NOT NULL DEFAULT true,
    "practitionerId" TEXT,
    "startTime" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closeTime" TIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
