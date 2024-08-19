import { Request, Response } from 'express';
import Order from '../models/order_model';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

// Get a single order by ID
export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('order_items.cuisine_id')
      .populate('order_owner')
      .populate('order_buka');
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (deletedOrder) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('order_items.cuisine_id')
      .populate('order_owner')
      .populate('order_buka');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};
