/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Employee` table. All the data in the column will be lost.
  - The primary key for the `Metric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Metric` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `employeeId` was added to the `Employee` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Made the column `birthDate` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_employeeId_fkey";

-- DropIndex
DROP INDEX "Employee_userId_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_pkey",
DROP COLUMN "id",
ADD COLUMN     "employeeId" VARCHAR NOT NULL,
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR,
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR,
ALTER COLUMN "birthDate" SET NOT NULL,
ALTER COLUMN "birthDate" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId");

-- AlterTable
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_pkey",
DROP COLUMN "id",
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "employeeId" SET DATA TYPE VARCHAR,
ADD CONSTRAINT "Metric_pkey" PRIMARY KEY ("createdAt", "employeeId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" VARCHAR NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR,
ALTER COLUMN "username" SET DATA TYPE VARCHAR,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- DropEnum
DROP TYPE "UPDATE_STATUS";

-- CreateTable
CREATE TABLE "ActCount" (
    "employeeId" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "ActCount_pkey" PRIMARY KEY ("employeeId","createdAt")
);

-- CreateTable
CREATE TABLE "Bpm" (
    "employeeId" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Bpm_pkey" PRIMARY KEY ("employeeId","createdAt")
);

-- CreateTable
CREATE TABLE "Overall" (
    "createdAt" TIMESTAMP(6) NOT NULL,
    "avgMentalScore" DOUBLE PRECISION,
    "avgPhysicalScore" DOUBLE PRECISION,

    CONSTRAINT "Overall_pkey" PRIMARY KEY ("createdAt")
);

-- CreateTable
CREATE TABLE "PassOut" (
    "employeeId" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "value" BOOLEAN NOT NULL,

    CONSTRAINT "PassOut_pkey" PRIMARY KEY ("employeeId","createdAt")
);

-- CreateTable
CREATE TABLE "Sos" (
    "employeeId" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "value" BOOLEAN NOT NULL,

    CONSTRAINT "Sos_pkey" PRIMARY KEY ("employeeId","createdAt")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ActCount" ADD CONSTRAINT "ActCount_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bpm" ADD CONSTRAINT "Bpm_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PassOut" ADD CONSTRAINT "PassOut_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sos" ADD CONSTRAINT "Sos_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE NO ACTION;
