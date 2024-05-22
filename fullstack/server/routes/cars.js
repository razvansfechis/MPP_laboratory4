import express from 'express';
import { getCars, createCar, getCar, deleteCar, updateCar } from '../controllers/cars.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/cars', authMiddleware, getCars);
router.post('/car', authMiddleware, createCar);
router.get('/car/:id', authMiddleware, getCar);
router.delete('/car/:id', authMiddleware, deleteCar);
router.put('/car/:id', authMiddleware, updateCar);

export default router;
