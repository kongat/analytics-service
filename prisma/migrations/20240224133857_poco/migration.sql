/*
  Warnings:

  - You are about to drop the column `score` on the `Metric` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "score",
ADD COLUMN     "mentalScore" DOUBLE PRECISION,
ADD COLUMN     "physicalScore" DOUBLE PRECISION;
