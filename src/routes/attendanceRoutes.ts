import { Router } from 'express';
import { 
  createAttendance, 
  updateAttendance, 
  getAllAttendances, 
  getAttendanceById, 
  deleteAttendance 
} from '../controllers/attendanceController';

const router = Router();

// Routes for attendance
router.post('/attendances', createAttendance); // Check In
router.put('/attendances/:id', updateAttendance); // Check Out
router.get('/attendances', getAllAttendances);
router.get('/attendances/:id', getAttendanceById);
router.delete('/attendances/:id', deleteAttendance);

export default router;
