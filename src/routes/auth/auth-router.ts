import { AuthController } from "@/controllers";
import { Router } from "express";

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export const AuthRouter = router;