import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";
import { createEmployee, deleteEmployee, getEmployeeByUserId, getEmployees, getEmployeesPageable, getOneEmployee, updateEmployee } from "./handlers/employee";
import { createMetric, getOneMetric } from "./handlers/metric";
import { changeMyPass, changeUserPass, createNewUser, deleteUser, getUsers, getUsersPageable, getUsersWithEmployeeRole, updateUser } from "./handlers/user";


const router = Router();

const customLoggerForSingleRouter = (message) => (req,res,next) => {
    console.log(`Hello from ${message}`)
    next()
  }

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {
    
});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", 
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    (req, res) => {});

router.put("/updatepoint/:id",
    body('name').optional().isString(),
    body('description').optional().isString(),
    (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

/**
 * Employee
 */
router.get("/employee", getEmployees);
router.get("/employee-pageable", getEmployeesPageable);

router.get("/employee/:id", getOneEmployee);
router.get("/employee-by-user-id/:userId", getEmployeeByUserId);

router.post("/employee",
    body("firstName").isString(),
    body("lastName").isString(), 
    handleInputErrors, 
    createEmployee);

router.put("/employee",
    body("firstName").isString(), 
    body("lastName").isString(), 
    handleInputErrors, 
    updateEmployee);

router.delete("/employee/:id", deleteEmployee);

/**
 * Metric
 */
router.post("/metric",
    body("physicalScore").isDecimal(),
    body("mentalScore").isDecimal(),
    body("employeeId").isString(), 
    handleInputErrors, 
    createMetric);

router.get("/metric/:id", getOneMetric);

/**
 * Users
 */
router.get("/user", getUsers);
router.get("/user-pageable", getUsersPageable);
router.post("/user",handleInputErrors, createNewUser);
router.put("/user",
    body("username").isString(), 
    body("role").isString(), 
    handleInputErrors, 
    updateUser);
router.put("/change-my-pass", changeMyPass);
router.put("/change-user-pass", changeUserPass);
router.delete("/user/:id", deleteUser);
router.get("/user/employee", getUsersWithEmployeeRole);


export default router;