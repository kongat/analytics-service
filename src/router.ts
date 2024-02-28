import { Router } from "express";
import { body, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middlewares";
import { createProduct, getProducts } from "./handlers/product";
import { createEmployee, deleteEmployee, getEmployees, getEmployeesPageable, getOneEmployee, updateEmployee } from "./handlers/employee";
import { createMetric, getOneMetric } from "./handlers/metric";
import { changePass, getUsers, getUsersPageable } from "./handlers/user";

const router = Router();

const customLoggerForSingleRouter = (message) => (req,res,next) => {
    console.log(`Hello from ${message}`)
    next()
  }
/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", (req, res) => {});

router.post("/product",body("name").isString(), handleInputErrors, createProduct);

router.put("/product/:id",body("name").isString(), handleInputErrors, (req, res) => {});

router.delete("/product/:id", (req, res) => {});

/**
 * Update
 */

router.get("/update", (req, res) => {});

router.get("/update/:id", (req, res) => {});

router.post("/update", 
    body('title').exists().isString(),
    body('body').exists().isString(),
    (req, res) => {});

router.put("/update/:id", 
    body('title').optional(),
    body('body').optional(),
    body('status').isIn(['INPROGRESS','SHIPPED','DEPRECATED']),
    body('version').optional(),
    (req, res) => {});

router.delete("/update/:id", (req, res) => {});

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => {});

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

router.post("/employee",
    body("firstName").isString(),
    body("lastName").isString(), 
    handleInputErrors, 
    createEmployee);

router.put("/employee/:id",
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

router.post("/change-pass", changePass);


export default router;