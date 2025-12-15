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
router.use(authMiddleware, requireAuth, requireAdmin);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);


export default router;