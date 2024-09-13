import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number; 
  name: string;
}

// Middleware untuk verifikasi token JWT
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Token biasanya dikirim dengan format "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid Token!' });
    }

    // Simpan data user (id_employee) ke req.user
    req.user = user as JwtPayload;
    next();
  });
};
