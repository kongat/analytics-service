-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "ROLE";
