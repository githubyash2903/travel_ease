import type { RouteObject } from "react-router-dom";

const Account: RouteObject = {
  path: "my-account/bookings", // This matches your header's dropdown
  lazy: async () => {
    const BookingsPage = await import("@/pages/Bookings");
    return { Component: BookingsPage.default };
  },
};
export default Account;