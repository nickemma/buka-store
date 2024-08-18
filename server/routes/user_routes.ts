import express from 'express';
import {
  login,
  logout,
  register,
  getUser,
  updateUser,
  changePassword,
} from '../handlers/user_handler';
import protect from '../middleware/auth';

const router = express.Router();

// Routes for user authentication and authorization
router.patch('/updateuser', protect, updateUser);
router.patch('/changepassword', protect, changePassword);

router.post('/signup', register);
router.post('/signin', login);

router.get('/getuser', protect, getUser);
router.get('/logout', logout);

export default router;