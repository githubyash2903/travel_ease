import { Router } from "express";
import { login, register, registerAdminController } from "../../controller/auth.controller";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/register/admin', registerAdminController);
authRouter.post('/login', login);

export default authRouter;
