import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Routes import here
import userRouter from './routes/user_routes';


const app = express();

//============= Middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

//============= test Route for server
app.get('/', (req, res) => {
  res.send('Welcome to the Buka Store API!');
});

//============= Routes
app.use('/api/users', userRouter);

//============= Server
const PORT = process.env.PORT || 5000;
const CONNECTION_URI = process.env.MONGO_URI || '';

mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });