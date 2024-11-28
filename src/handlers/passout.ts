import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const getUnresolvedPassoutEvents = async (req,res) => {
    const passoutEvents =  await prisma.passOut.findMany(
        {   where: {
                value: true
            },
            include: {
                Employee: true
            }
        }
    );
    res.json({data: passoutEvents})
}

export const createPassout = async (req,res) => {
    const employeeId = req.body.employeeId;
    const employee = await prisma.employee.findFirst({
        where: {
            employeeId
        },
        include: {
            metrics: true
        }
    }) 
    const passout = await prisma.passOut.create({
        data: {
            createdAt: new Date(),
            employeeId: employeeId,
            value: req.body.value
        },
        include: {
            Employee: true
        }
    })
    req.app.io.sockets.emit('passout',{data: passout});
    res.json({data: passout})
}

export const updatePassout = async (req,res) => {
    const employeeId = req.body.employeeId;
    const createdAt = req.body.createdAt;
    const passOut = await prisma.passOut.update({
        where: {
            employeeId_createdAt: {employeeId, createdAt}
        },
        data: {
            createdAt: req.body.createdAt,
            employeeId: req.body.employeeId,
            value: req.body.value,
        }
    })

    res.json({data: passOut})
}