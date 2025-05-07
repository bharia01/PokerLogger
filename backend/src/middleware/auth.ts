import { Request, Response, NextFunction } from 'express';

export const verifyAdminPassword = (req: Request, res: Response, next: NextFunction): void => {
  const password = req.query.password;

  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(403).json({ error: 'Unauthorized' });
    return; // 🚨 Important: ensure you return after sending a response
  }

  next(); // ✅ call next if authorized
};
