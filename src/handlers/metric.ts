import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const createMetric = async (req,res) => {
    const metric = await prisma.metric.create({
        data: {
            
            mentalScore: req.body.mentalScore,
            employeeId: req.body.employeeId
        }
    })

    res.json({data: metric})
}

export const getOneMetric = async (req, res) => {

    const id = req.params.id
    
    const metric = await prisma.metric.findFirst({
        where: {
            id
        }
    })

    res.json({data: metric})
}