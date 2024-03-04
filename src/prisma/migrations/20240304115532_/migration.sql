-- CreateEnum
CREATE TYPE "access" AS ENUM ('super_admin', 'admin', 'patient', 'practitioner');

-- CreateEnum
CREATE TYPE "statuses" AS ENUM ('approved', 'rejected', 'pending', 'completed', 'postponed');

-- CreateEnum
CREATE TYPE "indentity_card" AS ENUM ('ghana_card', 'voter_id', 'passport', 'driving_license');

-- CreateEnum
CREATE TYPE "days" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_level" "access" DEFAULT 'admin',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "img_url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,
    "access_level" "access" DEFAULT 'patient',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practitioner" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "pob" TEXT NOT NULL,
    "country" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "img_url" TEXT NOT NULL,
    "digital_address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "id_type" "indentity_card" NOT NULL DEFAULT 'ghana_card',
    "status" "statuses" DEFAULT 'pending',
    "id_number" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "licence_number" TEXT NOT NULL,
    "certificates" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rating" INTEGER,
    "specialisationId" TEXT,
    "hospitalId" TEXT,
    "access_level" "access" DEFAULT 'practitioner',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "practitioner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "specialisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospital" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practitionerhospitalspecialisation" (
    "practitionerId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "specialisationId" TEXT NOT NULL,

    CONSTRAINT "practitionerhospitalspecialisation_pkey" PRIMARY KEY ("practitionerId","hospitalId","specialisationId")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "practitionerId" TEXT,
    "patientId" TEXT,
    "hospitalId" TEXT,
    "serviceId" TEXT,
    "comment" TEXT NOT NULL,
    "tc" BOOLEAN NOT NULL,
    "payment_completed" BOOLEAN NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "status" "statuses" DEFAULT 'pending',
    "expiry" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT,
    "otp_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "deleted" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "patient_id_key" ON "patient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "patient_email_key" ON "patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "practitioner_id_key" ON "practitioner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "practitioner_email_key" ON "practitioner"("email");

-- CreateIndex
CREATE UNIQUE INDEX "specialisation_id_key" ON "specialisation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "specialisation_name_key" ON "specialisation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_id_key" ON "hospital"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_name_key" ON "hospital"("name");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_id_key" ON "appointment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_title_key" ON "appointment"("title");

-- CreateIndex
CREATE UNIQUE INDEX "service_id_key" ON "service"("id");

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "otp_id_key" ON "otp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "otp_user_id_key" ON "otp"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_id_key" ON "payment"("id");

-- AddForeignKey
ALTER TABLE "practitioner" ADD CONSTRAINT "practitioner_specialisationId_fkey" FOREIGN KEY ("specialisationId") REFERENCES "specialisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitioner" ADD CONSTRAINT "practitioner_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitionerhospitalspecialisation" ADD CONSTRAINT "practitionerhospitalspecialisation_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitionerhospitalspecialisation" ADD CONSTRAINT "practitionerhospitalspecialisation_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "practitionerhospitalspecialisation" ADD CONSTRAINT "practitionerhospitalspecialisation_specialisationId_fkey" FOREIGN KEY ("specialisationId") REFERENCES "specialisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_practitionerId_fkey" FOREIGN KEY ("practitionerId") REFERENCES "practitioner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
