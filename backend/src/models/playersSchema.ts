import { model, Schema } from "mongoose";

const playerSchema = new Schema({
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

export default model('Player', playerSchema);
