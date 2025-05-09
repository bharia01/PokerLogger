// backend/src/scripts/seedAdmin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import User from '../src/models/userSchema';
import Player from '../src/models/playersSchema';
import { nanoid } from 'nanoid';

config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_CLIENT!);
  const adminEmail = 'admin@example.com';

  const existingUser = await User.findOne({ email: adminEmail });
  if (existingUser) {
    console.log('✅ Admin user already exists.');
    return process.exit();
  }

  const _id = nanoid(10);
  const hashedPassword = await bcrypt.hash('AdminPass123!', 10);

  await User.create({
    _id,
    name: 'Admin User',
    email: adminEmail,
    phone: '0000000000',
    password: hashedPassword,
    role: 'admin',
  });

  await Player.create({
    _id,
    name: 'Admin User',
    email: adminEmail,
    phone: '0000000000',
    groups: [],
    games: [],
    joinDate: new Date(),
    stats: {
      gamesPlayed: 0,
      totalEarnings: 0,
      totalBuyIns: 0,
      totalPayOuts: 0,
    }
  });

  console.log('✅ Admin user and linked player created.');
  process.exit();
};

seedAdmin();
