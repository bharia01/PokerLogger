// backend/src/seedData.ts
import mongoose from 'mongoose';

const MONGO_CLIENT = process.env.MONGO_CLIENT || 'mongodb://localhost:27017/poker-api';

// 1. Define Schemas

const playerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  _id: String,
  groups: [String], // group IDs
  games: [String], // game IDs
  joinDate: Date,
  stats: {
    gamesPlayed: Number,
    totalEarnings: Number,
    totalBuyIns: Number,
    totalPayOuts: Number,
  },
});

const groupSchema = new mongoose.Schema({
  _id: String,
  name: String,
  members: [String], // array of player _id
  dateCreated: Date,
});

const gameSchema = new mongoose.Schema({
  _id: String,
  groupId: String,     // reference to group _id
  date: Date,
  results: [
    {
      playerId: String,  // reference to player _id
      amount: Number,
    },
  ],
});

// 2. Create Models

const Player = mongoose.model('Player', playerSchema);
const Group  = mongoose.model('Group', groupSchema);
const Game   = mongoose.model('Game', gameSchema);

// 3. Sample Data

const players = [
  {
    _id: 'player1',
    name: 'Alice Nguyen',
    phone: '555-123-4567',
    email: 'alice@example.com',
    groups: ['group1'],
    games: ['game1', 'game2'],
    joinDate: new Date('2024-01-15'),
    stats: {
      gamesPlayed: 2,
      totalEarnings: 75,
      totalBuyIns: 300,
      totalPayOuts: 375,
    },
  },
  {
    _id: 'player2',
    name: 'Ben Jackson',
    phone: '555-987-6543',
    email: 'ben@example.com',
    groups: ['group1', 'group2'],
    games: ['game1', 'game2', 'game3'],
    joinDate: new Date('2024-02-10'),
    stats: {
      gamesPlayed: 3,
      totalEarnings: 95,
      totalBuyIns: 250,
      totalPayOuts: 345,
    },
  },
  {
    _id: 'player3',
    name: 'Carla Gomez',
    phone: '555-765-4321',
    email: 'carla@example.com',
    groups: ['group1'],
    games: ['game1', 'game2'],
    joinDate: new Date('2024-03-01'),
    stats: {
      gamesPlayed: 2,
      totalEarnings: -20,
      totalBuyIns: 200,
      totalPayOuts: 180,
    },
  },
];


const groups = [
  {
    _id: 'group1',
    name: 'Friday Night Poker',
    members: ['player1', 'player2', 'player3'],
    dateCreated: new Date('2025-04-17'),
  },
  {
    _id: 'group2',
    name: 'Weekend Warriors',
    members: ['player2'],
    dateCreated: new Date('2025-04-20'),
  },
];

const games = [
  {
    _id: 'game1',
    groupId: 'group1',
    date: new Date('2025-04-18T19:30:00Z'),
    results: [
      { playerId: 'player1', amount: 25 },
      { playerId: 'player2', amount: -15 },
      { playerId: 'player3', amount: -10 },
    ],
  },
  {
    _id: 'game2',
    groupId: 'group1',
    date: new Date('2025-04-24T20:00:00Z'),
    results: [
      { playerId: 'player2', amount: 30 },
      { playerId: 'player1', amount: -20 },
      { playerId: 'player3', amount: -10 },
    ],
  },
  {
    _id: 'game3',
    groupId: 'group2',
    date: new Date('2025-04-25T21:00:00Z'),
    results: [
      { playerId: 'player2', amount: 50 },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_CLIENT);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Player.deleteMany({});
    await Group.deleteMany({});
    await Game.deleteMany({});

    // Insert new data
    await Player.insertMany(players);
    console.log(`🌱 Players seeded: ${players}`);
    await Group.insertMany(groups);
    console.log('🌱 Groups seeded');
    await Game.insertMany(games);
    console.log('🌱 Games seeded');

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seedDatabase();
