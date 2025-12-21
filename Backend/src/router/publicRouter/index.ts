import { Router } from "express";
import hotelRouter from "./hotels.router";
import roomRouter from "./room.router";
import flightsRouter from "./flights.router";

const publicRouter = Router();
publicRouter.use('/hotels', hotelRouter);
publicRouter.use('/room', roomRouter);
publicRouter.use('/flights', flightsRouter);
export default publicRouter