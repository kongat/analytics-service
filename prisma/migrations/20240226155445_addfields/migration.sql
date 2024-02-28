-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "gender" "GENDER";
