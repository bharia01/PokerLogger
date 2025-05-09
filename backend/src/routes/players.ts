import { Router } from 'express';
import { createPlayer, getPlayer, deletePlayer, getAllPlayers } from './../controllers/playerController';
import { authMiddleware } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/requireAdmin';


const router = Router();

router.get('/', getAllPlayers);
router.post('/', createPlayer);
router.get('/:id', getPlayer);
router.delete('/:id', authMiddleware, requireAdmin, deletePlayer);

export default router;
