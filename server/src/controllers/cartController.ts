import { Request, Response } from 'express';
import Cart from '../models/Cart';
import mongoose from 'mongoose';

export const getCart = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
  return res.status(401).json({ message: 'Unauthorized: please log in.' });
}

  try {

    let cart = await Cart.findOne( {userId} ).populate('items.productId');

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.json(cart);
    
  } catch (error) {
    res.status(500).json({message : 'Error fetching cart', error})
  }
}

export const addToCart = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: please log in.' });
  }

  if (!productId) {
    return res.status(400).json({ message: 'ProductId is required' });
  }

  try {
    let cart = await Cart.findOne({ userId });
    const prodId = productId.toString();

    if (!cart) {
      cart = await Cart.create({ userId, items: [{ productId, quantity: 1 }] });

      cart = await Cart.findOne({ userId }).populate('items.productId');
      return res.json(cart);
    }

    const existingItem = cart.items.find(item => item.productId.toString() === prodId);

    if(existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 })
    }

    await cart.save();
    cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart);
    
  } catch (error) {
    res.status(500).json({message : 'Error adding to cart', error})
  }
}

export const updateQuantity = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!userId) {
  return res.status(401).json({ message: 'Unauthorized: please log in.' });
  }

  if (!productId) {
    return res.status(400).json({ message: 'ProductId is required' });
  }

  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ message: 'Quantity must be a positive number' });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if(!existingItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    } 


    if (quantity === 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      existingItem.quantity = quantity; // ВСТАНОВЛЮЄМО quantity, а не додаємо
    }

    await cart.save();
    cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(cart);
    
  } catch (error) {
    res.status(500).json({message : 'Error updating quantity', error})
  }
}

export const removeFromCart = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { productId } = req.params;
  
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: please log in.' });
  }

  if (!productId) {
    return res.status(400).json({ message: 'ProductId is required' });
  }
  try {
    const prodId = new mongoose.Types.ObjectId(productId);
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: prodId } } },
      { new: true }
    ).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({message : 'Error removing item', error})
  }
}