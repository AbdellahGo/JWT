import { Router } from 'express';
const router = Router();
import { login, getProfile, getAdminAccess } from '../controllers/authController.js';
import { verifyToken, requireRole } from '../middlewares/authMiddleware.js';

// Public route
router.post('/login', login);

// Protected routes
router.get('/me', verifyToken, getProfile);
router.post('/admin', verifyToken, requireRole('MANAGER'), getAdminAccess);

export default router;