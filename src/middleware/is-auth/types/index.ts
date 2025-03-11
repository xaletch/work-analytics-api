import { Request } from 'express';

export interface CustomRequest extends Request {
  email: string;
  auth_date: number;
  userId: number;
}