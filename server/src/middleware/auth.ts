import "../types/express-augment";

import { Response, Request,  NextFunction } from "express";
import jwt from 'jsonwebtoken';
import type { AuthPayload } from "../types/auth";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({message: 'No authorization header'})
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'No token provided'})
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthPayload;

    req.user = decodedToken;

    next();
    
  } catch (error) {
    return res.status(401).json({message: 'Invalid token', error})
    
  }
}

// export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user?.role !== 'admin') {
//     return res.status(403).json({message: 'Access denied: admin only'})
//   }
//   next();

// }