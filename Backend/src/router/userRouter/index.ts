import { Router } from "express";
import profileRouter from "./profile.router";
import bookingRouter from "./bookings.router";
import contactRouter from "./contact.router";

const userRouter = Router();

userRouter.use("/profile", profileRouter);
userRouter.use("/bookings", bookingRouter);
userRouter.use('/contact', contactRouter);
export default userRouter;
