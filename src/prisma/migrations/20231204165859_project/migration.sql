-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_user_id_key" ON "Project"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_name_key" ON "Project"("project_name");
