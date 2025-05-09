// backend/src/middleware/requireAdmin.ts
import { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: any, res: any, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
