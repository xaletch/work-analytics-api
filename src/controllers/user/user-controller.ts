import { User } from "@/models";
import { Request, Response } from "express";
import { CustomRequest } from "@/middleware/is-auth/types";


class UserController {
  async get (req: Request, res: Response) {
    try {
      const id = req as CustomRequest;

      const user = await User.findByPk(id.userId);
      
      if (!user) {
        res.status(404).json({ status: 404, message: 'Пользователь не найден' });
        return;
      }

      res.status(200).json({ status: 200, data: user });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: 'Ошибка сервера' });
      console.error('Ошибка в user controller ', err);
    }
  };
}

export default new UserController();