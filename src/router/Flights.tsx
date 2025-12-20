import type { RouteObject } from "react-router-dom";

const flights: RouteObject = {
  path: "flights",
  children: [
    {
      index: true,
      lazy: async () => {
        const Flights = await import("@/pages/Flights/Flights");
        return { Component: Flights.default };
      },
    },
    {
      // FIXED — prevent catching DEL, DE, D, ANY TEXT
      path: ":id",
      lazy: async () => {
        const Flights = await import("@/pages/Flights/FlightsDetail");
        return { Component: Flights.default };
      },
    },
  ],
};

export default flights;
