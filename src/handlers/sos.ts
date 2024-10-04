import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const createSos = async (req,res) => {
    const sos = await prisma.sos.create({
        data: {
            createdAt: new Date(),
            employeeId: req.body.employeeId,
            value: req.body.value
        }
    })

    res.json({data: sos})
}