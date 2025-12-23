import { Router } from "express";
import * as controller from "../../controller/user/bookings.controller";

const bookingRouter = Router();

bookingRouter.post("/hotel", controller.createHotelBooking);
bookingRouter.post("/flight", controller.createFlightBooking);
bookingRouter.post("/package", controller.createPackageBooking);

bookingRouter.get("/", controller.listMyBookings);
bookingRouter.get("/:id", controller.getMyBookingById);

export default bookingRouter;
