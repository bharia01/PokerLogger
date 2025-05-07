import { Router } from 'express';
import { createGroup, deleteGroup, getGroup, getGroupById } from './../controllers/groupController';
import { verifyAdminPassword } from '../middleware/auth';

const router = Router();

router.post('/', createGroup);
router.get('/:id', getGroup);
router.delete('/:id', verifyAdminPassword, deleteGroup);
router.get('/:groupId', getGroupById);


export default router;