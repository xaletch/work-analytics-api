import { UserController } from "@/controllers";
import { auth } from "@/middleware";
import { Router } from "express";

const router = Router();

router.get('/account', auth, UserController.get);

export const UserRouter = router;