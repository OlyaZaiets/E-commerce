import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getMyOrders, getOrderById, checkout } from "../controllers/orderController";



const router = Router();

router.post('/checkout', authMiddleware, checkout);
router.get('/', authMiddleware, getMyOrders);
router.get('/:id', authMiddleware, getOrderById);

export default router;