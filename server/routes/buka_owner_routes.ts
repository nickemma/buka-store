import express from 'express';
import { registerBuka, loginBuka, getSingleBuka, updateBuka } from '../handlers/buka_owner_handler';

import protect from '../middleware/auth';

const router = express.Router();

router.post('/register', registerBuka); // Register a new Buka
router.post('/login', loginBuka); // Login Buka
router.get('/:id', protect, getSingleBuka); // Get a single Buka by ID
router.put('/:id', protect, updateBuka); // Update a Buka by ID

export default router;
