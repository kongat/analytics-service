import prisma from "../modules/db";

export const getEmployees = async (req,res) => {
    const employees = await prisma.employee.findMany({
        include: {
            metrics: true
        }
    })

    res.json({data: employees})
}

export const getOneEmployee = async (req, res) => {

    const id = req.params.id
    
    const employee = await prisma.employee.findFirst({
        where: {
            id
        },
        include: {
            metrics: true
        }
    })

    res.json({data: employee})
}

export const createEmployee = async (req,res) => {
    const employee = await prisma.employee.create({
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    })

    res.json({data: employee})
}

export const updateEmployee = async (req,res) => {
    const id = req.params.id
    const product = await prisma.employee.update({
        where: {
            id
        },
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
    })

    res.json({data: product})
}

export const deleteEmployee = async (req,res) => {
    const id = req.params.id

    const deleted = await prisma.employee.delete({
        where: {
            id
        }
    })

    res.json({data: deleted})
}