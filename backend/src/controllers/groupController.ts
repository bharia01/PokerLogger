import { Request, Response } from 'express';
import Group from '../models/groupsSchema';

export const createGroup = async (req: Request, res: any) => {
  try {
    const newGroup = new Group(req.body);
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

export const getGroupById = async (req: Request, res: any) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findOne({ groupId });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching group', error });
  }
};

export const getGroup = async (req: Request, res: any): Promise<void> => {
  try {
    const group = await Group.find();
    res.json(group);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

export const deleteGroup = async (req: Request, res: any): Promise<void> => {
  try {
    const player = await Group.findById({
      _id: req.params.id,
    });
    await Group.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting group' });
  }
};
