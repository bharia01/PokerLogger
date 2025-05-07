import { Request, Response } from 'express';
import Game from '../models/gamesSchema';
import { ObjectId } from 'mongodb';

export const getGamesByGroup = async (req: Request, res: Response) => {
  try {
    const { groupId } = req.params;
    const games = await Game.find({ groupId });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch games by group', error });
  }
};

export const getGamesByPlayer = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const playerId = new ObjectId(_id);
    const games = await Game.findById({
      _id: { $elemMatch: { playerId }  },
    });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch games by player', error });
  }
};

export const createGame = async (req: Request, res: Response) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create game', error });
  }
};


export const deleteGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findById({
      _id: new ObjectId(req.params.id),
    });
    await Game.deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json({ message: 'Game deleted: ', game });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting game' });
  }
};
