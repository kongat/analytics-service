-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_employeeId_fkey";

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
