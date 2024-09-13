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
export const createAttendance = async (req: Request, res: Response) => {
    const id_employee = req.user?.id;  // ID employee didapat dari token JWT
    
    try {
      // Mengecek apakah user sudah melakukan check-in hari ini
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Mengatur waktu ke awal hari
      
      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          employeeId: id_employee,
          date: {
            gte: today,
          },
        },
      });
  
      if (existingAttendance) {
        return res.status(400).json({ error: 'You have already checked in today.' });
      }
  
      // Jika belum check-in, buat data attendance baru dengan waktu check-in saat ini
      const attendance = await prisma.attendance.create({
        data: { 
          employeeId: id_employee, 
          checkIn: new Date(),  // Waktu check-in otomatis diisi dengan waktu saat ini
        },
        include: {
          employee: {
            select: {
              name: true,
            },
          },
        },
      });
  
      res.status(201).json(attendance);  // Mengembalikan data attendance
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export const updateAttendance = async (req: Request, res: Response) => {
    const id_employee = req.user?.id; // ID employee dari token
  
    try {
      // Mencari record attendance yang belum di-check-out hari ini
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Mengatur waktu ke awal hari
  
      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          employeeId: id_employee,
          date: {
            gte: today,
          },
          checkOut: null,  // Hanya ambil attendance yang belum di-check-out
        },
      });
  
      if (!existingAttendance) {
        return res.status(404).json({ error: 'No active check-in found for today.' });
      }
  
      // Update waktu check-out dengan waktu saat ini
      const updatedAttendance = await prisma.attendance.update({
        where: { id: existingAttendance.id },
        data: {
          checkOut: new Date(),  // Waktu check-out otomatis diisi dengan waktu saat ini
        },
        include: {
          employee: {
            select: {
              name: true,
            },
          },
        },
      });
  
      res.json(updatedAttendance);  // Mengembalikan data attendance yang sudah di-update
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
