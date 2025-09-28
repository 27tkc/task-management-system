import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from './../models/User';

const SECRET_KEY = 'your_secret_key'; // in production, store in env vars

export interface AuthRequest extends Request {
  user?: { id: string; role: Role };
}

// Authentication middleware
export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = { id: user.id, role: user.role };
    next();
  });
}

// Role-based access middleware
export function authorizeRoles(...roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) return res.sendStatus(403);
    next();
  };
}
