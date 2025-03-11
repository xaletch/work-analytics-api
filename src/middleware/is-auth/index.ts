import { SECRET_KEY } from "@/constants";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { CustomRequest } from "./types";
import { getUser } from "@/services";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new Error('Токен не передан');
    }

    jwt.verify(token, SECRET_KEY, async (error, decoded) => {
      if (error) {
        return res.status(403).json({ status: 403, message: 'Недействительный токе' });
      };

      const userId = (decoded as CustomRequest).userId
      const user = await getUser(userId);

      if (!user) {
        throw new Error('Пользователь не найден');
      }

      (req as CustomRequest).userId = userId;
      
      next();
    });
  }
  catch (err) {
    res.status(401).json({ status: 401, message: 'Не авторизован' });
    console.error('Ошибка в isAuth middleware: ', err);
  }
}