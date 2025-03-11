import { CustomRequest } from "@/middleware/is-auth/types";
import { Customers } from "@/models";
import { ICustomer } from "@/models/customers/types";
import { Request, Response } from "express";

class CustomersController {
  async all (req: Request, res: Response) {
    try {
      const { userId } = req as CustomRequest;
      
      const customers = await Customers.findAll({ where: { userId: userId } });

      res.status(200).json({ status: 200, data: customers });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
      console.error(err);
    }
  };
  async one (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req as CustomRequest;

      if (!id) {
        res.status(400).json({ status: 400, message: "Отсутствуют необходимые данные" });
        return;
      }

      const customerFind = await Customers.findOne({ where: { userId: userId, id: id } });

      if (!customerFind) {
        res.status(404).json({ status: 404, message: 'Заказчик не найден' });
        return;
      }

      const customer = await Customers.findOne({ where: { id: id } });

      res.status(200).json({ status: 200, data: customer });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
      console.error(err);
    }
  };
  async create (req: Request, res: Response) {
    try {
      const { userId } = req as CustomRequest;

      const { name, tg, freelance, color } = req.body;

      const customerFind = await Customers.findOne({ where: { userId: userId, name: name } });

      if (customerFind) {
        res.status(404).json({ status: 404, message: 'Заказчик уже создан' });
        return;
      }

      const newCustomer = {
        name: name,
        tg: tg,
        freelance: freelance,
        color: color,
        userId: userId
      } as ICustomer;

      await Customers.create(newCustomer);

      res.status(200).json({ status: 200, message: 'Заказчик создан' });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
      console.error(err);
    }
  };
  async update (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req as CustomRequest;

      if (!id) {
        res.status(400).json({ status: 400, message: "Отсутствуют необходимые данные" });
        return;
      }

      const customer = await Customers.findOne({ where: { userId: userId, id: id } });

      if (!customer) {
        res.status(404).json({ status: 404, message: 'Заказчик не найден' });
        return;
      }

      const { name, tg, freelance, color } = req.body;

      const customerFind = await Customers.findOne({ where: { userId: userId, name: name } });

      if (customerFind) {
        res.status(404).json({ status: 404, message: 'Заказчик уже создан' });
        return;
      }

      const updateCustomer = {
        name: name,
        tg: tg,
        freelance: freelance,
        color: color
      } as ICustomer;

      await Customers.update(updateCustomer, { where: { id: id } });

      res.status(200).json({ status: 200, message: 'Заказчик обновлен' });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
      console.error(err);
    }
  };
  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { userId } = req as CustomRequest;

      if (!id) {
        res.status(400).json({ status: 400, message: "Отсутствуют необходимые данные" });
        return;
      }

      const customer = await Customers.findOne({ where: { userId: userId, id: id } });

      if (!customer) {
        res.status(404).json({ status: 404, message: 'Заказчик не найден' });
        return;
      }

      await Customers.destroy({ where: { id: id } });

      res.status(200).json({ status: 200, message: 'Заказчик удален' });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
      console.error(err);
    }
  }
}

export default new CustomersController();