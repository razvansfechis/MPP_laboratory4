import express from 'express';
import { getOwners, createOwner, getOwner, deleteOwner, updateOwner } from '../controllers/owners.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/owners', authMiddleware, getOwners);
router.post('/owner', authMiddleware, createOwner);
router.get('/owner/:id', authMiddleware, getOwner);
router.delete('/owner/:id', authMiddleware, deleteOwner);
router.put('/owner/:id', authMiddleware, updateOwner);

export default router;
