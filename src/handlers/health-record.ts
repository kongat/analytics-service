import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const createHealthRecord = async (req,res) => {

    const date = new Date();

    const [bpm, actCount, gsr] = await prisma.$transaction([
        prisma.bpm.create({
            data: {
                createdAt: date,
                value: req.body.bpm,
                employeeId: req.body.employeeId
            }
        }),
        prisma.actCount.create({
            data: {
                createdAt: date,
                count: req.body.count,
                employeeId: req.body.employeeId
            }
        }),
        prisma.gsr.create({
            data: {
                createdAt: date,
                value: req.body.gsr,
                employeeId: req.body.employeeId
            }
        })
    ]);

    res.json({data: bpm,actCount,gsr})

    
}