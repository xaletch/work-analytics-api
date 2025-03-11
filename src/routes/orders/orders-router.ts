import { OrderController } from "@/controllers";
import { auth } from "@/middleware";
import { Router } from "express";

const router = Router();

router.get('/order', auth, OrderController.all);
router.get('/order/:id', auth, OrderController.one);
router.post('/order', auth, OrderController.create);
router.put('/order/:id', auth, OrderController.update);
router.delete('/order/:id', auth, OrderController.delete);

export const OrderRouter = router;