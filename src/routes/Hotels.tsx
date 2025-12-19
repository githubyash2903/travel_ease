import type { RouteObject } from "react-router-dom";

const Hotels: RouteObject = {
  path: "hotels",
  children: [
    {
      index: true,
      lazy: async () => {
        const Hotels = await import("@/pages/Hotel/Hotels");
        return { Component: Hotels.default };
      },
    },
    {
      // Changed this path
      path: ":id",
      lazy: async () => {
        const Hotel = await import("@/pages/Hotel/HotelDetail");
        return { Component: Hotel.default };
      },
    },
  ],
};
export default Hotels;
