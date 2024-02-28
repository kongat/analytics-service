/*
  Warnings:

  - Made the column `mentalScore` on table `Metric` required. This step will fail if there are existing NULL values in that column.
  - Made the column `physicalScore` on table `Metric` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Metric" ALTER COLUMN "mentalScore" SET NOT NULL,
ALTER COLUMN "physicalScore" SET NOT NULL;
