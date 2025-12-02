import { Router } from 'express';
import { createUser, deleteUser, getMe, getUsers, updateUser } from '../controllers/userController';
import { adminMiddleware, authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, adminMiddleware,  createUser );
// router.get('/', getUsers );
router.get('/', authMiddleware, adminMiddleware, getUsers );
router.patch('/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser)
router.get('/me', authMiddleware, getMe)

export default router;