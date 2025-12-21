import { Router } from "express";
import profileRouter from "./profile.router";

const userRouter = Router();

userRouter.use('/profile', profileRouter);

export default userRouter