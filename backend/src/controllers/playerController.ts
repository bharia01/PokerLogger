import { Request, Response } from 'express';
import Player from '../models/playersSchema';

export const createPlayer = async (req: Request, res: any) => {
  try {
    const player = await Player.create(req.body);
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create player' });
  }
};

export const getAllPlayers = async (req: Request, res: any) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch players' });
  }
};

export const getPlayer = async (req: Request, res: any): Promise<void> => {
  try {
    const { _id } = req.params;
    const player = await Player.findById({
      _id,
    });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching player' });
  }
};

export const deletePlayer = async (req: Request, res: any): Promise<void> => {
  try {
    const { _id } = req.params;
    const player = await Player.findById({
      _id,
    });
    await Player.deleteOne({ player });
    res.status(200).json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting player' });
  }
};
