import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "@/constants";
import { User } from "@/models";
import { AuthTypes, RegisterTypes } from "./types";

class AuthController {
  async login (req: Request, res: Response) {
    try {
      const { email, password }: AuthTypes = req.body;

      if (!email || !password) {
        res.status(400).json({ status: 400, message: 'Не все поля заполнены корректно' });
        return;
      }

      const user = await User.unscoped().findOne({ where: { email } });

      if (!user) {
        res.status(400).json({ status: 400, message: 'Неверный логин или пароль' });
        return;
      }

      const validate = await bcrypt.compare(password, user.dataValues.password);

      if (!validate) {
        res.status(400).json({ status: 400, message: 'Неверный логин или пароль' });
        return;
      }
      
      const authDate = Math.floor(Date.now() / 1000);

      const token = jwt.sign({ authDate: authDate, userId: user.dataValues.id, }, SECRET_KEY, { expiresIn: '10d' });

      res.status(200).json({ status: 200, token });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера' });
      console.error('Ошибка при авторизации', err);
    }
  };
  async register(req: Request, res: Response) {
    try {
      const { name, email, password }: RegisterTypes = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ status: 400, message: 'Не все поля заполнены корректно' });
        return;
      }

      const user = await User.findOne({ where: { email } });

      if (user) {
        res.status(400).json({ status: 400, message: 'Пользователь с таким email уже зарегистрирован' });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const authDate = Math.floor(Date.now() / 1000);

      const newUser: RegisterTypes = {
        name: name,
        email: email,
        password: hash,
      };
      
      const createdUser = await User.create(newUser);

      const token = jwt.sign({ authDate: authDate, userId: createdUser.dataValues.id }, SECRET_KEY, { expiresIn: '10d' });

      res.status(200).json({ status: 200, message: 'Вы успешно зарегистрировались', token });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера', err });
      console.error('Ошибка при регистрации', err);
    }
  };
  async logout(_: Request, res: Response) {
    try {
      res.status(200).json({ status: 200, message: 'Вы вышли с аккаунта' });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера' });
      console.error('Ошибка при выходе с аккаунта ', err)
    }
  };
};

export default new AuthController();