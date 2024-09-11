import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({ where: { id: Number(id) } });
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new employee
export const createEmployee = async (req: Request, res: Response) => {
  const { name, email, password, position, phone } = req.body;
  try {
    const employee = await prisma.employee.create({
      data: { name, email, password, position, phone },
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update employee
export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, position, phone } = req.body;
  try {
    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { name, email, password, position, phone },
    });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
