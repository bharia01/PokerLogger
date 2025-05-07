import { Router } from 'express';
import { createGame, deleteGame, getGamesByPlayer, getGamesByGroup } from './../controllers/gameController';
import { verifyAdminPassword } from '../middleware/auth';

const router = Router();

router.post('/', createGame);
router.get('/:playerId', getGamesByPlayer);
router.get('/group/:groupId', getGamesByGroup);
router.delete('/:id', verifyAdminPassword, deleteGame);

export default router;