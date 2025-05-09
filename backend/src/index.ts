import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import playerRoutes from './routes/players';
import groupRoutes from './routes/groups';
import gameRoutes from './routes/games';
import authRoutes from './routes/auth';

// Load environment variables from .env
dotenv.config();

// Set up Express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_CLIENT = process.env.MONGO_CLIENT || 'mongodb://localhost:27017/poker-api';

// Middleware
app.use(cors()); // Allow CORS from frontend
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_CLIENT)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });


