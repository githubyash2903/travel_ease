import type { RouteObject } from "react-router-dom";

const BookingConfirmation: RouteObject = {
  path: "booking-confirmation",
  lazy: async () => {
    const BookingConfirmation = await import("@/pages/BookingConfirmation");
    return { Component: BookingConfirmation.default };
  },
};
export default BookingConfirmation;