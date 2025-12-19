import type { RouteObject } from "react-router-dom";

const Payment: RouteObject = {
  path: "payment",
  lazy: async () => {
    const Payment = await import("@/pages/Payment");
    return { Component: Payment.default };
  },
};
export default Payment;