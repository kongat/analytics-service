-- CreateTable
CREATE TABLE "Gsr" (
    "employeeId" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Gsr_pkey" PRIMARY KEY ("employeeId","createdAt")
);

-- AddForeignKey
ALTER TABLE "Gsr" ADD CONSTRAINT "Gsr_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE CASCADE ON UPDATE NO ACTION;
