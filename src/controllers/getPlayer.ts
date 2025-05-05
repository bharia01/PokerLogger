import { ObjectId } from 'mongodb';

export async function getPlayerController(req: any, res: any) {
    try {
        const { db } = req.app;

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Player ID is required' });
        }

        // Get the player data
        const result = await db.collection('players').findOne({
            _id: ObjectId.createFromHexString(id)
        });

        if (!result) {
            return res.status(404).json({ message: 'Player not found' });
        }

        res.status(200).json({
            message: 'Players retrieved successfully',
            players: result
        });

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}