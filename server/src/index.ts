import './types/express-augment';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import importProducts from './routes/importProducts';
import cartRoutes from './routes/cartRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/import', importProducts);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);




app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI as string;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error))

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});


