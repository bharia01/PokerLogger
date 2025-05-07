import { Router } from 'express';
import { createPlayer, getPlayer, deletePlayer, getAllPlayers } from './../controllers/playerController';
import { verifyAdminPassword } from '../middleware/auth';

const router = Router();

router.get('/', getAllPlayers);
router.post('/', createPlayer);
router.get('/:id', getPlayer);
router.delete('/:id', verifyAdminPassword, deletePlayer);

export default router;
