import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
  user: {
    id: string;
    role: 'user' | 'admin';
  };
}

export interface AuthRequest extends Request {
  user?: UserPayload['user'];
}