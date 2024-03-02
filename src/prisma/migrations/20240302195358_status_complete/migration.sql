-- AlterEnum
ALTER TYPE "statuses" ADD VALUE 'completed';

-- AlterTable
ALTER TABLE "otp" ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_id_key" ON "payment"("id");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
