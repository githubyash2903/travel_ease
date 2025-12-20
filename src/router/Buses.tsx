import type { RouteObject } from "react-router-dom";

const Buses: RouteObject = {
  path: "buses",
  children: [
    {
      index: true,
      lazy: async () => {
        const Buses = await import("@/pages/Bus/Buses");
        return { Component: Buses.default };
      },
    },
    {
      path: ":id",
      lazy: async () => {
        const Buses = await import("@/pages/Bus/BusDetail");
        return { Component: Buses.default };
      },
    },
  ],
};
export default Buses;
