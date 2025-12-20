import type { RouteObject } from "react-router-dom";

const Offers: RouteObject = {
  path: "hotel-checkout",
  lazy: async () => {
    const HotelCheckout = await import("@/pages/Hotel/HotelCheckout");
    return { Component: HotelCheckout.default };
  },
};
export default Offers;