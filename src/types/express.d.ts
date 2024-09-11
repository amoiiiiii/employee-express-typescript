import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Int; // Pastikan ini sesuai dengan tipe ID yang Anda gunakan
      };
    }
  }
}