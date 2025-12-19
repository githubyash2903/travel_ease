import express from "express";
import { createFlightBooking } from "../controllers/bookingcontroller/flightBookings.controller";

const router = express.Router();

router.post("/", createFlightBooking);

export default router;
