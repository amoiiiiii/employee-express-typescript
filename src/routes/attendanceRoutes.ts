import express from 'express';
import { createAttendance, updateAttendance } from '../controllers/attendanceController';
import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router();

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Retrieve all attendances
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance list
 *       401:
 *         description: Unauthorized
 */
router.post('/api/attendance/checkin', authenticateToken, createAttendance);

/**
 * @swagger
 * /api/attendance/checkout:
 *   put:
 *     summary: Check-out employee
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Successfully checked out
 *       404:
 *         description: No active check-in found
 *       500:
 *         description: Internal Server Error
 */
router.put('/api/attendance/checkout', authenticateToken, updateAttendance);

export default router;
