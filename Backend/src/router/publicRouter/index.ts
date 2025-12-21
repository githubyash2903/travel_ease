import { Router } from "express";
import hotelRouter from "./hotels.router";
import roomRouter from "./room.router";

const publicRouter = Router();
publicRouter.use('/hotels', hotelRouter);
publicRouter.use('/room', roomRouter);
export default publicRouter