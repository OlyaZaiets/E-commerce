import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, country, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({message: 'Email already in use'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      // country,
      role: 'user'

    })

    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.json({
    message: 'User registered',
    token,
    role: user.role,
});
    
  } catch (error) {
    res.status(500).json({message: 'Registration failed', error})
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'})
    }

    if (!user.password) {
      return res.status(401).json({
        message: 'This account uses Google sign-in. Please continue with Google.',
      });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    
    if(!isMatchPassword) {
      return res.status(401).json({message: 'Invalid email or password'})
    }

    const token = jwt.sign(
      {id: user._id, role: user.role},
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      role: user.role,
    }); 


    
  } catch (error) {
    res.status(500).json({message: 'Login failed', error})
  }

}

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ message: 'No accessToken provided' });
    }

    const r = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const googleUser = await r.json();

    if (!r.ok) {
      return res.status(401).json({ message: 'Invalid Google access token' });
    }

    const { sub, email, name } = googleUser;

    if (!email) {
      return res.status(401).json({ message: 'Google account has no email' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName: name || email,
        email,
        provider: 'google',
        googleId: sub || '',
        role: 'user',
      });
    } else {
      // optional: link Google to existing account
      if (!user.googleId) user.googleId = sub || '';

      if (user.provider !== 'google') user.provider = user.provider || 'local';
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Google auth successful',
      token,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Google auth failed', error });
  }
};
