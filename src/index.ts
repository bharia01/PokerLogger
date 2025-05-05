import { MongoClient } from 'mongodb';

const express = require('express');
const body = require('body-parser');

async function start() {
    try {
        
        const app = express();
        
        const mongo = await MongoClient.connect('mongodb://localhost:27017/poker-api');

        await mongo.connect();

        app.db = mongo.db();

        // Body parser

        app.use(body.json({
            limit: '500kb'
        }));

        // Routes

        app.use('/players', require('./routes/players'));

        // Start the server

        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    }
    catch (error) {
        console.error('Error starting the server:', error);
    }
}

start();