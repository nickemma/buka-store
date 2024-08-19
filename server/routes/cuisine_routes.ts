import express from 'express';
import {
  createCuisine,
  getAllCuisines,
  getCuisineById,
  updateCuisine,
  deleteCuisine,
} from '../handlers/cuisine_handler'
import protect from '../middleware/auth';

const router = express.Router();

// Route to create a new cuisine
router.post('/', protect, createCuisine);

// Route to get all cuisines
router.get('/', getAllCuisines);

// Route to get a single cuisine by ID
router.get('/:id', getCuisineById);

// Route to update a cuisine
router.put('/:id', protect, updateCuisine);

// Route to delete a cuisine
router.delete('/:id', protect, deleteCuisine);

export default router;
