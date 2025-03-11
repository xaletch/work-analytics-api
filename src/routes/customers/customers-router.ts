import { CustomerController } from "@/controllers";
import { auth } from "@/middleware";
import { Router } from "express";

const router = Router();

router.get('/customer', auth, CustomerController.all);
router.get('/customer/:id', auth, CustomerController.one);
router.post('/customer', auth, CustomerController.create);
router.put('/customer/:id', auth, CustomerController.update);
router.delete('/customer/:id', auth, CustomerController.delete);

export const CustomerRouter = router;