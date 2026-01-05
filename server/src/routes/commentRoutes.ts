import { Router } from 'express';
import { createProductComment, deleteComment, getProductComments, updateComment } from '../controllers/commentController';
import { requireAuth } from '../middleware/requireAuth';
import { authMiddleware } from '../middleware/auth';


const router = Router();

router.get('/:id/comments', getProductComments);
router.post('/:id/comments', authMiddleware, requireAuth, createProductComment);

router.patch('/comments/:commentId', authMiddleware, requireAuth, updateComment);
router.delete('/comments/:commentId', authMiddleware, requireAuth, deleteComment);


export default router;
