import { Router } from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController';
import { authMiddleware } from '../middleware/auth';
import { requireAuth } from '../middleware/requireAuth';
import { requireAdmin } from '../middleware/requireAdmin';

const router = Router();

// public
router.get('/', getProducts);
router.get('/:id', getProductById);

//admin
// router.use(authMiddleware, requireAuth, requireAdmin);
router.post('/',authMiddleware, requireAuth, requireAdmin, createProduct);
router.patch('/:id', authMiddleware, requireAuth, requireAdmin, updateProduct);
router.delete('/:id', authMiddleware, requireAuth, requireAdmin, deleteProduct);


export default router;