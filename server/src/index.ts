import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import importProducts from './routes/importProducts';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// Connect to MongoDB
const mongoULI = process.env.MONGO_URI as string;

mongoose.connect(mongoULI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error))

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server is running on http://localhost:' + port);
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/import', importProducts);

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});


