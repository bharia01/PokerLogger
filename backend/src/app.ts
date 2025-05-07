import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import playerRoutes from './routes/players';
import groupRoutes from './routes/groups';
import gameRoutes from './routes/games';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/players', playerRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/games', gameRoutes);

export default app;