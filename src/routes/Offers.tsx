import type { RouteObject } from "react-router-dom";

const Offers: RouteObject = {
  path: "offers",
  lazy: async () => {
    const OffersPage = await import("@/pages/Offers");
    return { Component: OffersPage.default };
  },
};
export default Offers;