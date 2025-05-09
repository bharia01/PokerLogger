import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userSchema';
import Player from '../models/playersSchema';
import dotenv from 'dotenv';
import { authMiddleware } from '../middleware/authMiddleware';

dotenv.config();
const router = express.Router();

router.get('/me', authMiddleware, async (req: any, res: any) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });

// POST /api/auth/register
router.post('/register', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    await User.create({
        name,
        email,
        password,
        role: 'user',
      });
    
      await Player.create({
        name,
        email,
        groups: [],
        games: [],
        joinDate: new Date(),
        stats: {
          gamesPlayed: 0,
          totalEarnings: 0,
          totalBuyIns: 0,
          totalPayOuts: 0,
        },
      });
    
      res.status(201).json({ message: 'User registered' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST /api/auth/login
router.post('/login', async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    if (!(password === user.password)) {
        return res.status(400).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '5h' }
    );

    return res.status(200).json({
      token,
      user: { name: user.name, role: user.role, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ err: 'Server error during login' });
  }
});

export default router;
