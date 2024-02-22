/*
  Warnings:

  - The values [GHANA_CARD,VOTER_ID,PASSPORT,DRIVING_LICENCE] on the enum `indentity_card` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `status` on the `appointment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "statuses" AS ENUM ('approved', 'rejected', 'pending');

-- AlterEnum
BEGIN;
CREATE TYPE "indentity_card_new" AS ENUM ('ghana_card', 'voter_id', 'passprt', 'driving_license');
ALTER TABLE "practitioner" ALTER COLUMN "id_type" DROP DEFAULT;
ALTER TABLE "practitioner" ALTER COLUMN "id_type" TYPE "indentity_card_new" USING ("id_type"::text::"indentity_card_new");
ALTER TYPE "indentity_card" RENAME TO "indentity_card_old";
ALTER TYPE "indentity_card_new" RENAME TO "indentity_card";
DROP TYPE "indentity_card_old";
ALTER TABLE "practitioner" ALTER COLUMN "id_type" SET DEFAULT 'ghana_card';
COMMIT;

-- AlterTable
ALTER TABLE "appointment" DROP COLUMN "status",
ADD COLUMN     "status" "statuses" NOT NULL;

-- AlterTable
ALTER TABLE "practitioner" ADD COLUMN     "status" "statuses" NOT NULL DEFAULT 'pending',
ALTER COLUMN "id_type" SET DEFAULT 'ghana_card';

-- DropEnum
DROP TYPE "status";
