import type { RouteObject } from "react-router-dom";

const Checkout: RouteObject = {
  path: "checkout",
  lazy: async () => {
    const Checkout = await import("@/pages/Checkout");
    return { Component: Checkout.default };
  },
};
export default Checkout;