import { Router } from "express";
import auth from "../middlewares/auth";
import { getMyBookings } from "../controllers/bookings.controller";

const router = Router();

router.get("/my", auth, getMyBookings);

export default router;
