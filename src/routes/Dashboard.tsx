import type { RouteObject } from "react-router-dom";

const Dashboard: RouteObject = {
  path: "dashboard/",
  lazy: async () => {
    const Dashboard = await import("@/pages/Dashboard");
    return { Component: Dashboard.default };
  },
};
export default Dashboard;