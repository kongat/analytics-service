import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const createMetric = async (req,res) => {
    const metric = await prisma.metric.create({
        data: {
            createdAt: new Date(),
            physicalScore: req.body.physicalScore,
            mentalScore: req.body.mentalScore,
            employeeId: req.body.employeeId
        }
    })

    res.json({data: metric})
}

export const getOneMetric = async (req, res) => {

    const id = req.params.id
    const { createdAt, employeeId } = req.params;

    const createdAtDate = new Date(createdAt);
    
    const metric = await prisma.metric.findUnique({
        where: {
            createdAt_employeeId: {
              createdAt: createdAtDate,
              employeeId: employeeId
            },
        }
    })

    res.json({data: metric})
}