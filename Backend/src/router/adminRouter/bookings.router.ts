import { Router } from "express";
import * as controller from "../../controller/admin/bookings.controller";

const bookingRouter = Router();

bookingRouter.get("/", controller.listAllBookings);
bookingRouter.get("/:id", controller.getBookingById);

bookingRouter.post("/:id/approve", controller.approveBooking);
bookingRouter.post("/:id/decline", controller.declineBooking);

export default bookingRouter;
