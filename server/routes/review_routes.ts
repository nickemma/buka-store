import express from 'express';
import { protect } from '../middleware/auth';
import { createReview } from '../handlers/review_handler';

const router = express.Router();

router.post('/', protect, createReview);

export default router;
