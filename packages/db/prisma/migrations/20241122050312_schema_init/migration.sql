-- CreateEnum
CREATE TYPE "COURSE" AS ENUM ('MCA', 'BCA', 'BSC');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "DESIGNATION" AS ENUM ('HR', 'Manager', 'Sales');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "designation" "DESIGNATION" NOT NULL,
    "gender" "GENDER" NOT NULL,
    "course" "COURSE" NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_phone_key" ON "Employee"("phone");
