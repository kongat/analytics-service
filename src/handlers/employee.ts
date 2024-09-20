import prisma from "../modules/db";

export const getEmployees = async (req,res) => {
    const employees = await prisma.employee.findMany({
        include: {
            metrics: true
        }
    })

    res.json({data: employees})
}

export const getEmployeesPageable = async (req,res) => {
    const { page = 0, pageSize = 10 } = req.query;
    

    const [employees,count] = await prisma.$transaction([
    
    prisma.employee.findMany({
        skip:+page * +pageSize,
        take:+pageSize,
        include: {
            metrics: true
        }
    }),

    prisma.employee.count()])

    res.json({data: employees,totalElements: count})
}

export const getOneEmployee = async (req, res) => {

    const employeeId = req.params.id
    
    const employee = await prisma.employee.findFirst({
        where: {
            employeeId
        },
        include: {
            metrics: true
        }
    }) 

    res.json({data: employee}) 
}

export const getEmployeeByUserId = async (req, res) => {

    const userId = req.params.userId
    
    const employee = await prisma.employee.findFirst({
        where: {
            userId
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
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
            userId: req.body.userId,
        }
    })

    res.json({data: employee})
}

export const updateEmployee = async (req,res) => {
    const employeeId = req.body.id
    const employee = await prisma.employee.update({
        where: {
            employeeId
        },
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
        }
    })

    res.json({data: employee})
}

export const deleteEmployee = async (req,res) => {
    const employeeId = req.params.id

    const deleted = await prisma.employee.delete({
        where: {
            employeeId
        }
    })

    res.json({data: deleted})
}