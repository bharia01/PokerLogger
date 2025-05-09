import { Router } from 'express';
import { createGame, deleteGame, getGamesByPlayer, getGamesByGroup } from './../controllers/gameController';

const router = Router();

router.post('/', createGame);
router.get('/:playerId', getGamesByPlayer);
router.get('/group/:groupId', getGamesByGroup);
router.delete('/:id', deleteGame);

export default router;