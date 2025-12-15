import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController';

const router = Router();
router.get('/', authMiddleware, getCart);
router.post('/add', authMiddleware, addToCart);
router.patch('/:productId', authMiddleware, updateQuantity);
router.delete('/remove/:productId', authMiddleware, removeFromCart);

export default router;
