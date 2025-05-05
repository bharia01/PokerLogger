export async function createPlayerController(req: any, res: any) {
    try {
        const { db } = req.app;

        const { name, email, phone } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Required data is missing'})
        }

        // Check if the player already exists
        const existingPlayer = await db.collection('players').findOne({
             email: email.toLowerCase(),
        });

        if (existingPlayer) {
            return res.status(400).json({ message: 'Player already exists' });
        }

        // Check if the phone number is valid
        if (phone && phone.length > 10) {
            return res.status(400).json({ message: 'Phone number cannot be longer than 10 digits' });
        }

        // Validate the email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { 
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Insert the player into the database
        const result = await db.collection('players').insertOne({
            name,
            email: email.toLowerCase(),
            phone,
            createdAt: new Date(),
        });

        if (result.acknowledged) {
            res.status(200).json({ message: 'Player created successfully' });
        } else {
            throw new Error('Failed to create player');
        }

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}