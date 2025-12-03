import { Router } from 'express';
import { createUser, deleteUser, getMe, getUsers, updateUser, updateUserProfile } from '../controllers/userController';
import { adminMiddleware, authMiddleware } from '../middleware/auth';

const router = Router();
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateUserProfile);

router.post('/', authMiddleware, adminMiddleware,  createUser );
// router.get('/', getUsers );
router.get('/', authMiddleware, adminMiddleware, getUsers );
router.patch('/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);



export default router;