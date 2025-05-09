import { model, Schema } from "mongoose";

const gameSchema = new Schema({
    groupName: String,
    groupId: String,
    gameId: String,
    players: [
      {
        playerName: String,
        buyIn: Number,
        payOut: Number,
      }
    ],
    gameDescription: String,
    gameDate: Date,
}, { versionKey: false });

export default model('Game', gameSchema);
  