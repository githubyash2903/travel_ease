import { Router } from "express";
import profileRouter from "./profile.router";
import bookingRouter from "./bookings.router";

const userRouter = Router();

userRouter.use("/profile", profileRouter);
userRouter.use("/bookings", bookingRouter);

export default userRouter;
