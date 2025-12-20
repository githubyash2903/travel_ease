import { Router } from "express";
import profileRouter from "./profile.router";
import hotelRouter from "./hotels.router";

const userRouter = Router();

userRouter.use('/profile', profileRouter);
userRouter.use('/hotels', hotelRouter);

export default userRouter