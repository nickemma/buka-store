import { Request, Response } from 'express';
import Buka from '../models/buka_owner_model';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';

/*
 * @desc    Generate a token
 * @access  Private
 */

const secretKey = process.env.JWT_SECRET;
const tokenExpiration = process.env.NODE_ENV === 'development' ? '1d' : '7d';

const generateToken = (user: { _id: string; role: string }) => {
  return jwt.sign( { id: user._id, role: user.role }, secretKey as Secret, {
    expiresIn: tokenExpiration,
  });
};

/*
 * @route   POST api/buka/register
 * @desc    Register A Buka
 * @access  Public
 */

// Register a new Buka
export const registerBuka = async (req: Request, res: Response) => {
  const { buka_name, email, password } = req.body;

  try {
     // validations here
    if (!buka_name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if Buka already exists
    const existingBuka = await Buka.findOne({ email });
    if (existingBuka) {
      return res.status(400).json({ message: 'Buka with email already exists' });
    }

    // Create a new buka
    const newBuka = await Buka.create({
     buka_name,
      email,
      password,
    });

    // Convert ObjectId to string
    const token = generateToken({ _id: newBuka._id.toString(), role: newBuka.role });


    // Set the token in a cookie with the same name as the token
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      sameSite: 'none',
      secure: true,
    });

    if (newBuka) {
      const { _id, buka_name, email, image, phone, address,postcode,pre_order,go_live,opening_hours} = newBuka;
      // Send a success response with the user data (excluding password)
      res.status(201).json({
        message: 'Buka registered successfully',
        user: { _id, buka_name, email, image, phone, address,postcode,pre_order,go_live,opening_hours, token},
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

/*
 * @route   POST api/buka/login
 * @desc    Login A Buka
 * @access  Public
 */

export const loginBuka = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
     // validations here
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Find the Buka by email
    const buka = await Buka.findOne({ email });
    if (!buka) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, buka.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Convert ObjectId to string
    const token = generateToken({ _id: buka._id.toString(), role: buka.role });

    // Set the token in a cookie with the same name as the token
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      sameSite: 'none',
      secure: true,
    });

    if (buka && isMatch) {
      const { _id, buka_name, email, image, phone, address,postcode,pre_order,go_live,opening_hours } = buka;
      // Send a success response with the user data (excluding password)
      res.status(200).json({
        message: 'Buka logged in successfully',
        user: { _id, buka_name, email, image, phone, address,postcode,pre_order,go_live,opening_hours, token },
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

/*
 * @route   GET api/buka/:id
 * @desc    Get A Buka Profile
 * @access  Private
 */
// Get a single Buka by ID
export const getSingleBuka = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const buka = await Buka.findById(id);
    if (!buka) {
      return res.status(404).json({ message: 'Buka not found' });
    }

    res.json(buka);
  } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};

/*
 * @route   PUT api/buka/:id
 * @desc    Update A Buka Profile
 * @access  Private
 */

// Update a Buka by ID
export const updateBuka = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedBuka = await Buka.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBuka) {
      return res.status(404).json({ message: 'Buka not found' });
    }

    res.json(updatedBuka);
  } catch (error) {
        res.status(500).json({ message: 'Something went wrong. Please try again...' });
  }
};


/*
 * @route   GET api/bukas
 * @desc    Get All Bukas
 * @access  Private
 */

export const getAllBukas = async (req: Request, res: Response) => {
  try {
    const bukas = await Buka.find(); // Fetch all Bukas from the database
    res.status(200).json(bukas);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again...', error });
  }
};

// export const getAllBukas = async (req: Request, res: Response) => {
//   const { page = 1, limit = 10 } = req.query; // pagination value

//   try {
//     const bukas = await Buka.find()
//       .limit(Number(limit))
//       .skip((Number(page) - 1) * Number(limit));

//     const total = await Buka.countDocuments(); // Get the total number of Bukas

//     res.status(200).json({ bukas, total, page: Number(page), limit: Number(limit) });
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong. Please try again...', error });
//   }
// };
