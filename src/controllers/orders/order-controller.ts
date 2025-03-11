import { CustomRequest } from "@/middleware/is-auth/types";
import { Customers, Orders } from "@/models";
import { IOrders } from "@/models/orders/types";
import { Request, Response } from "express";

class OrderController {
  async all (req: Request, res: Response) {
    try {
      const { userId } = req as CustomRequest;

      const orders = await Orders.findAll({ where: { userId: userId },  include: [{ model: Customers, attributes: ['id', 'name', 'tg', 'color'] }] });
      
      res.status(200).json({ status: 200, data: orders });
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

      const orderFind = await Orders.findOne({ where: { userId: userId, id: id } });

      if (!orderFind) {
        res.status(404).json({ status: 404, message: 'Заказ не найден' });
        return;
      }

      const order = await Orders.findOne({ where: { id: id }, include: [{ model: Customers, attributes: ['id', 'name', 'tg', 'color'] }] });

      res.status(200).json({ status: 200, data: order });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
      console.error(err);
    }
  };
  async create (req: Request, res: Response) {
    try {
      const { userId } = req as CustomRequest;

      const { name, price, status, description, time, customer } = req.body;

      const customerFind = await Customers.findOne({ where: {  userId: userId, id: customer } });

      if (!customerFind) {
        res.status(404).json({ status: 404, message: 'Заказчик не найден' });
        return;
      }

      const newOrder = {
        name: name,
        price: price,
        status: status,
        description: description,
        time: time,
        customerId: customer,
        userId: userId,
      } as IOrders;

      await Orders.create(newOrder);

      res.status(200).json({ status: 200, message: 'Заказ создан' });
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

      const order = await Orders.findOne({ where: { id: id, userId: userId } });

      if (!order) {
        res.status(404).json({ status: 404, message: 'Заказ не найден' });
        return;
      }

      const { name, price, status, description, time, customer } = req.body;

      const customerFind = await Customers.findOne({ where: { userId: userId, id: customer } });

      if (!customerFind) {
        res.status(404).json({ status: 404, message: 'Заказчик не найден' });
        return;
      }

      const newOrder = {
        name: name,
        price: price,
        status: status,
        description: description,
        time: time,
        customerId: customer,
      } as IOrders;

      await Orders.update(newOrder, { where: { id: id } })

      res.status(200).json({ status: 200, message: 'Заказ обновлен' });
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

      const order = await Orders.findOne({ where: { userId: userId, id: id } });

      if (!order) {
        res.status(404).json({ status: 404, message: 'Заказ не найден' });
        return;
      }

      await Orders.destroy({ where: { id: id } });

      res.status(200).json({ status: 200, message: 'Заказ удален' });
    }
    catch (err) {
      res.status(500).json({ status: 500, message: "Ошибка сервера" });
      console.error(err);
    }
  }
}

export default new OrderController();