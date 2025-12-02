import { Request, Response } from 'express';
import Product from '../models/Product';
import mongoose from 'mongoose';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({message: 'Error creating product', error})
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({message: 'Error fetching products', error})
  }
}

export const updateProduct = async (req: Request, res: Response) => {
    console.log('REQ PARAMS UPDATE:', req.params);
  try {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message : 'Invalid product ID format'})
    }
    
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!product) {
      return res.status(404).json({message: 'Product not found'})
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({message: 'Error updating products', error})
  }
}


export const deleteProduct = async (req: Request, res: Response) => {
  console.log('REQ PARAMS DELETE:', req.params);
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message: 'Invalid product ID format'})
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({message: 'Product not found'})
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({message: 'Error deleting product', error})
  }
}