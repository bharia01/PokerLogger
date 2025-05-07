import { model, Schema } from "mongoose";

const groupSchema = new Schema({
    players: [String], // players IDs
    groupId: String,
    groupName: String,
    games: [String], // game IDs
    dateCreated: Date,
});

export default model('Group', groupSchema);