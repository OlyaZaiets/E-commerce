import { Request, Response } from 'express';
import User, { UserType } from '../models/User';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// interface AuthRequest extends Request {
//   user: {
//     id: string;
//     role: string;
//   };
// }

export const createUser = async (req: Request, res: Response) =>  {
  try {
    const { fullName, email, password, phone, country } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if(existingUser) {
      return res.status(409).json({ message: 'User with this email or phone already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      // country,
      role: 'user'
    });

  const userWithoutPassword = user.toObject() as Partial<UserType>;
  delete userWithoutPassword.password;
  res.json(userWithoutPassword);

    
  } catch (error) {
    res.status(400).json({message : 'Error creating user', error})
  }
}

export const getUsers = async (req: Request, res: Response) =>  {
  try {
    const user = await User.find().select('-password');
    res.json(user);
    
  } catch (error) {
    res.status(500).json({message : 'Error fetching user', error})
  }
}

export const updateUser = async (req: Request, res: Response) =>  {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message : 'Invalid user ID format'})
    }

    if ('role' in req.body) {
      delete req.body.role;
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if(!user) {
      return res.status(404).json({message: 'User not found'})
    }
    
    const userWithoutPassword = user.toObject() as Partial<UserType>;
    delete userWithoutPassword.password;
    res.json(userWithoutPassword);
    
  } catch (error) {
    res.status(500).json({message : 'Error updating user', error})
  }
}
export const deleteUser = async (req: Request, res: Response) =>  {
  try {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({message : 'Invalid user ID format'})
    }

    const user = await User.findByIdAndDelete(id);

    if(!user) {
      return res.status(404).json({message: 'User not found'})
    }
    res.json({message: 'User deleted'});
    
  } catch (error) {
    res.status(500).json({message : 'Error deleting user', error})
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');

    if (!user) {
      return res.status(400).json({message: 'User not found'})
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
}

export const updateUserProfile = async (req: Request, res: Response) => {
  try {

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // const authReq = req as AuthRequest;
    // const userId = authReq.user.id; // беремо ID із токена


    const user = await User.findById(req.user?.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { oldPassword, password, ...rest } = req.body;

    if (password) {
      if (!oldPassword) {
        return res.status(400).json({ message: 'Old password is required' });
      }

    if (!user.password) {
      return res.status(401).json({ message: 'Use Google sign-in for this account.' });
    }


      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }

      // Хешуємо новий пароль тільки після успішної перевірки
      rest.password = await bcrypt.hash(password, 10);
    }

    // 3️⃣ Забороняємо змінювати роль
    if ('role' in rest) delete rest.role;

    // 4️⃣ Тепер можна оновлювати дані
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: rest },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userWithoutPassword = updatedUser.toObject() as Partial<UserType>;
    delete userWithoutPassword.password;

    res.json(userWithoutPassword);
    
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

export const addToWishlist = async (req: Request, res: Response) => {

  // const authReq = req as AuthRequest;
  // const userId = authReq.user.id;
  
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const productId = req.params.productId;
  const user = await User.findById(req.user?.id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const productObjectId = new mongoose.Types.ObjectId(productId);

  // Перевірка чи вже у wishlist (через equals)
  const exists = user.wishlist.some(id => id.equals(productObjectId));

  if (!exists) {
    user.wishlist.push(productObjectId);
    await user.save();
  }

  res.json({ wishlist: user.wishlist });
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  // const authReq = req as AuthRequest;
  // const userId = authReq.user.id;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const productId = req.params.productId;

  const user = await User.findById(req.user?.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const productObjectId = new mongoose.Types.ObjectId(productId);

  user.wishlist = user.wishlist.filter(id => !id.equals(productObjectId));

  await user.save();

  res.json({ wishlist: user.wishlist });
};


export const getWishlist = async (req: Request, res: Response) => {
  // const authReq = req as AuthRequest;
  // const userId = authReq.user.id;

  const user = await User.findById(req.user?.id).populate('wishlist');

  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user.wishlist);
};



