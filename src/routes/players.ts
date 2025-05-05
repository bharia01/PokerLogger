import { get } from 'http';
import { createPlayerController } from '../controllers/createPlayer';
import { getPlayersController } from '../controllers/getPlayers';
import { getPlayerController } from '../controllers/getPlayer';

const express = require('express');
const router = express.Router();

console.log('players route loaded');

router.get('/', getPlayersController);

router.post('/', createPlayerController);

router.get('/:id', getPlayerController);

module.exports = router;