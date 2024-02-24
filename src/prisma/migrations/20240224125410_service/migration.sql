/*
  Warnings:

  - You are about to drop the column `practitioners` on the `hospital` table. All the data in the column will be lost.
  - You are about to drop the column `practitioners` on the `specialisation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "hospital" DROP COLUMN "practitioners";

-- AlterTable
ALTER TABLE "specialisation" DROP COLUMN "practitioners";

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_id_key" ON "service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");
