import { Router } from 'express';
import { addToWishlist, createUser, deleteUser, getMe, getUsers, getWishlist, removeFromWishlist, updateUser, updateUserProfile } from '../controllers/userController';
import { authMiddleware } from '../middleware/auth';
import { requireAuth } from '../middleware/requireAuth';
import { requireAdmin } from '../middleware/requireAdmin';
import { getAddress, updateAddress } from '../controllers/addressController';


const router = Router();
router.use(authMiddleware, requireAuth);

// profile

router.get('/me',  getMe);
router.patch('/me', updateUserProfile);

//wishlist

router.post('/wishlist/:productId', addToWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);
router.get('/wishlist', getWishlist);

// address
router.get('/address', getAddress);
router.patch('/address', updateAddress);


// admin
router.post('/', requireAdmin,  createUser );
router.get('/', requireAdmin, getUsers );
router.patch('/:id', requireAdmin, updateUser);
router.delete('/:id', requireAdmin, deleteUser);




export default router;