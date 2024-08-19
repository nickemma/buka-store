import express from 'express';
import {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
} from '../handlers/order_handler'
import protect from '../middleware/auth';

const router = express.Router();

// Routes for order management
router.post('/create', protect, createOrder); // Create a new order
router.get('/:id', protect, getOrder); // Get a single order
router.patch('/update/:id', protect, updateOrder); // Update an order
router.delete('/delete/:id', protect, deleteOrder); // Delete an order
router.get('/', protect, getAllOrders); // Get all orders

export default router;
