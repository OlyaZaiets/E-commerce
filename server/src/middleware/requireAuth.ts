import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that guarantees req.user exists
 */
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): asserts req is Request & { user: NonNullable<Request['user']> } {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
}
