import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all attendances
export const getAllAttendances = async (req: Request, res: Response) => {
  try {
    const attendances = await prisma.attendance.findMany();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get attendance by ID
export const getAttendanceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const attendance = await prisma.attendance.findUnique({ where: { id: Number(id) } });
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new attendance
export const createAttendance = async (req: Request, res: Response) => {
  const { id_employee, checkIn, checkOut, status } = req.body;
  try {
    const attendance = await prisma.attendance.create({
      data: { 
        id_employee, 
        checkIn: new Date(checkIn), 
        checkOut: checkOut ? new Date(checkOut) : null, 
        status 
      },
    });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update attendance
export const updateAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { checkIn, checkOut, status } = req.body;
  try {
    const attendance = await prisma.attendance.update({
      where: { id: Number(id) },
      data: { 
        checkIn: new Date(checkIn), 
        checkOut: checkOut ? new Date(checkOut) : null, 
        status 
      },
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete attendance
export const deleteAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.attendance.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
