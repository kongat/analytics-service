/*
  Warnings:

  - You are about to alter the column `score` on the `Metric` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Metric" ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;
