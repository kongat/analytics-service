/*
  Warnings:

  - You are about to drop the column `mentalScore` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `physicalScore` on the `Metric` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "mentalScore",
DROP COLUMN "physicalScore";
