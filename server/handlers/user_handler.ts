import jwt, { Secret } from 'jsonwebtoken';
import User from '../models/user_model';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import AuthorizedRequest from '../types/request';

/*
 * @desc    Generate a token
 * @access  Private
 */

const secretKey = process.env.JWT_SECRET;
const tokenExpiration = process.env.NODE_ENV === 'development' ? '1d' : '7d';

const generateToken = (id: string) => {
  return jwt.sign({ id }, secretKey as Secret, {
    expiresIn: tokenExpiration,
  });
};

/*
 * @route   GET api/users
 * @desc    Get A user Profile
 * @access  Private
 */

export const getUser = async (req: AuthorizedRequest<any>, res: Response) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (user) {
      const { _id, first_name, last_name, email, image, phone } = user;
      res.status(200).json({ _id, first_name, last_name, email, image, phone });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

/*
 * @route   POST api/users
 * @desc    Register A User
 * @access  Public
 */

export const register = async (req: Request, res: Response) => {
  const { first_name, last_name, email, password, image, phone } = req.body;

  try {
    // validations here
    if (!first_name ||!last_name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 8 characters long' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this Email already exists' });
    }

    // Create a new user
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password,
      image,
      phone,
    });

    // Convert ObjectId to string
    const token = generateToken(newUser._id.toString());

    // Set the token in a cookie with the same name as the token
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      sameSite: 'none',
      secure: true,
    });

    if (newUser) {
      const { _id, first_name, last_name, email, image, phone } = newUser;
      // Send a success response with the user data (excluding password)
      res.status(201).json({
        message: 'User registered successfully',
        user: { _id, first_name, last_name, email, image, phone, token },
      })
    }
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      // Handle validation error
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return res
        .status(400)
        .json({ message: 'Validation error', errors: validationErrors });
    }

    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

/*
 * @route   POST api/users
 * @desc    Login A User
 * @access  Public
 */

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // validations here
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found, please signup' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'Invalid Email or Password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Convert ObjectId to string
    const token = generateToken(user._id.toString());
    // Set the token in a cookie with the same name as the token
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      sameSite: 'none',
      secure: true,
    });

    if (user && isPasswordValid) {
      const { _id, first_name, last_name, email, image, phone } = user;
      res.status(200).json({ message: 'User logged in successfully', user: { _id, first_name, last_name, email, image, phone, token } });
    } else {
      res.status(400).json({ message: 'Invalid Email or Password' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again' });
  }
};

/*
 * @route   POST api/users/updateuser
 * @desc    Update a user
 * @access  Private
 */

export const updateUser = async (
  req: AuthorizedRequest<any>,
  res: Response
) => {
  try {
    const user = await User.findById(req.user);
    if (user) {
      const { first_name, last_name, email, image, phone } = user;
      user.email = email;
      user.first_name = req.body.first_name || first_name;
      user.last_name = req.body.last_name || last_name;
      user.image = req.body.image || image;
      user.phone = req.body.phone || phone;

      const updatedUser = await user.save();
      res.status(200).json({
        message: 'User updated successfully',
        user : {
        _id: updatedUser._id,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        image: updatedUser.image,
        phone: updatedUser.phone,
        }
      });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

/*
 * @route   POST api/users/change-password
 * @desc    Change a user's password
 * @access  Private
 */

export const changePassword = async (
  req: AuthorizedRequest<any>,
  res: Response
) => {
  try {
    const user = await User.findById(req.user);
    const { password, oldPassword } = req.body;
    if (!user) {
      return res.status(400).json({ message: 'User not found, Sign-Up' });
    }
    // validations here
    if (!password || !oldPassword) {
      return res.status(400).json({ message: 'Please provide both current and new password to proceed.' });
    }

    // Check if old password is correct
    if (!user.password) {
      return res.status(400).json({ message: 'Please enter correct password' });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (user && isPasswordValid) {
      user.password = password;
      await user.save();
      res
        .status(200)
        .json({ message: 'Password changed successfully, Please login' });
        // Clear the authentication token (JWT)
      res.clearCookie('token');
    } else {
      res.status(400).json({ message: 'Current Password is incorrect, try again' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

/*
 * @route   POST api/users/logout
 * @desc    Logout a user
 * @access  Public
 */

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
};