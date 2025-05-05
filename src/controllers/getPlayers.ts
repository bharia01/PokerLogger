export async function getPlayersController(req: any, res: any) {
    try {
        const { db } = req.app;

        const result = await db.collection('players').find().toArray();

        res.status(200).json({
            message: 'Players retrieved successfully',
            players: result
        });

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}