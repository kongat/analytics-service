-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'OFFLINE');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "status" "STATUS";
