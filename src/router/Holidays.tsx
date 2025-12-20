import type { RouteObject } from "react-router-dom";

const holidays: RouteObject = {
  path: "holidays",
  children: [
    {
      index: true,
      lazy: async () => {
        const Holidays = await import("@/pages/Holidays/Holidays");
        return { Component: Holidays.default };
      },
    },
    {
      // Changed this path
      path: ":id",
      lazy: async () => {
        const Holidays = await import("@/pages/Holidays/HolidayDetails");
        return { Component: Holidays.default };
      },
    },
  ],
};
export default holidays;
