import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

export const getUnresolvedSosEvents = async (req,res) => {
    const sosEvents = await prisma.sos.findMany(
        {   where: {
                value: true
            },
            include: {
                Employee: true
            }
        }
    );
    res.json({data: sosEvents})
}

export const createSos = async (req,res) => {
    const employeeId = req.body.employeeId;
    const employee = await prisma.employee.findFirst({
        where: {
            employeeId
        },
        include: {
            metrics: true
        }
    }) 
    const sos = await prisma.sos.create({
        data: {
            createdAt: new Date(),
            employeeId: req.body.employeeId,
            value: req.body.value
        },
        include: {
            Employee: true
        }
    })
    req.app.io.sockets.emit('sos',{data: sos});
    res.json({data: sos})
}

export const updateSos= async (req,res) => {
    const employeeId = req.body.employeeId;
    const createdAt = req.body.createdAt;
    const sos = await prisma.sos.update({
        where: {
            employeeId_createdAt: {employeeId, createdAt}
        },
        data: {
            createdAt: req.body.createdAt,
            employeeId: req.body.employeeId,
            value: req.body.value,
        }
    })

    res.json({data: sos})
}