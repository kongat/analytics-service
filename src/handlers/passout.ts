import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const createPassout = async (req,res) => {
    const passout = await prisma.passOut.create({
        data: {
            createdAt: new Date(),
            employeeId: req.body.employeeId,
            value: req.body.value
        }
    })

    res.json({data: passout})
}