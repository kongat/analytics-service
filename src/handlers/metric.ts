import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const createMetric = async (req,res) => {
    console.log(req.body)
    console.log(req.body.score)
    console.log(+req.body.score)
    const metric = await prisma.metric.create({
        data: {
            score: req.body.score,
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