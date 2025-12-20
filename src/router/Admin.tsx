import type { RouteObject } from "react-router-dom";

const Admin: RouteObject = {
  path: "admin",
  children: [
    {
      index: true,
      lazy: async () => {
        const Admin = await import("@/pages/Admin/AdminDashboard");
        return { Component: Admin.default };
      },
    },
    {
      // FIXED — prevent catching DEL, DE, D, ANY TEXT
      path: "users",
      lazy: async () => {
        const Admin = await import("@/pages/Admin/AdminUsers");
        return { Component: Admin.default };
      },
    },
    {
      // FIXED — prevent catching DEL, DE, D, ANY TEXT
      path: "coupons",
      lazy: async () => {
        const Admin = await import("@/pages/Admin/AdminCoupons");
        return { Component: Admin.default };
      },
    },
  ],
};

export default Admin;
