// src/routes/employeeRoutes.ts
import { Router } from 'express';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  loginEmployee
} from '../controllers/employeeController';

const router = Router();

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee in the system
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahma Ayu Andari
 *               email:
 *                 type: string
 *                 example: aamoiu@gmail.com
 *               password:
 *                 type: string
 *                 example: defaultpassword
 *               position:
 *                 type: string
 *                 example: developer
 *               phone:
 *                 type: string
 *                 example: 085860092110
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/employee', createEmployee);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get('/employees', getAllEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Employee details
 */
router.get('/employees/:id', getEmployeeById);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Employee updated successfully
 */
router.put('/employees/:id', updateEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 */
router.delete('/employees/:id', deleteEmployee);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Allows a user to log in and receive a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *               password:
 *                 type: string
 *                 example: defaultpassword
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginEmployee);

export default router;
