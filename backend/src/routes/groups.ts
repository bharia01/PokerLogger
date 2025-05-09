import { Router } from 'express';
import { createGroup, deleteGroup, getGroup, getGroupById } from './../controllers/groupController';

const router = Router();

router.post('/', createGroup);
router.get('/:id', getGroup);
router.delete('/:id', deleteGroup);
router.get('/:groupId', getGroupById);


export default router;