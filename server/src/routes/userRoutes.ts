import { Router } from 'express';
import { addToWishlist, createUser, deleteUser, getMe, getUsers, getWishlist, removeFromWishlist, updateUser, updateUserProfile } from '../controllers/userController';
import { adminMiddleware, authMiddleware } from '../middleware/auth';

const router = Router();
router.get('/me', authMiddleware, getMe);
router.patch('/me', authMiddleware, updateUserProfile);

router.post('/', authMiddleware, adminMiddleware,  createUser );
// router.get('/', getUsers );
router.get('/', authMiddleware, adminMiddleware, getUsers );
router.patch('/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

router.post('/wishlist/:productId', authMiddleware, addToWishlist);
router.delete('/wishlist/:productId', authMiddleware, removeFromWishlist);
router.get('/wishlist', authMiddleware, getWishlist);

export default router;