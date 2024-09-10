import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const loginEmployee = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      // Find employee by email
      const employee = await prisma.employee.findUnique({
        where: { email }
      });
  
      if (!employee) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, employee.password);
  
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: employee.id, email: employee.email }, JWT_SECRET, {
        expiresIn: '1h'
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Failed to login' });
    }
  };
// Create an employee
export const createEmployee = async (req: Request, res: Response) => {
    try {
      const { name, email, password, position, phone } = req.body;
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const employee = await prisma.employee.create({
        data: {
          name,
          email,
          password: hashedPassword,
          position,
          phone
        }
      });
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create employee' });
    }
  };

// Get all employees
export const getAllEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve employees' });
  }
};

// Get an employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) }
    });
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve employee' });
  }
};

// Update an employee by ID
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, position, phone } = req.body;
    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
        position,
        phone
      }
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

// Delete an employee by ID
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};
