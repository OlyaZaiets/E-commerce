import { Request, Response } from "express";
import User from "../models/User";

export const getAddress = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: please log in.' });
  }

  try {
    let user = await User.findById(userId).select('addresses');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const address = user.addresses[0] || null;

    res.json(address);
  } catch (error) {
    res.status(500).json({message : 'Error fetching address' })
  }
}

export const updateAddress = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { country, postalCode, region, city, street, building } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: please log in.' });
  }

  if (!country || !postalCode || !region || !city || !street || !building) {
    return res.status(400).json({
    message: 'All address fields are required',
    });
  }

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newAddress = {
      country,
      postalCode,
      region,
      city,
      street,
      building,
      isDefault: true,
    };

    if (user.addresses.length === 0) {
      user.addresses.push(newAddress);
    } else {
        user.addresses[0] = {
        ...user.addresses[0],
        ...newAddress,
      };
    }

    await user.save();
    res.json(user.addresses[0]);

    
  } catch (error) {
    res.status(500).json({message : 'Error updating address' })
  }
}