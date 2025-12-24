import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import NotFound from "@/pages/NotFound";

import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";

import { RequireAuth } from "./guards/RequireAuth";
import { RequireRole } from "./guards/RequireRole";
import { BlockAuthPages } from "./guards/BlockAuthPages";
import ProfileRoutes from "./ProfileRoutes";

export const router = createBrowserRouter([
  /**
   * Public ROUTES
   */
  {
    element: <AppLayout />,
    children: publicRoutes,
  },
  /**
   * AUTH ROUTES
   */
  {
    path: "/auth",
    element: <BlockAuthPages />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            lazy: async () => {
              const { LoginSignup } = await import("@/pages/LoginSignup");
              return { Component: LoginSignup };
            },
          },
        ],
      },
    ],
  },

  /**
   * USER DASHBOARD
   */
  {
    path: "/profile",
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowed={["user"]} />,
        children: [
          {
            element: <AppLayout />,
            children: ProfileRoutes,
          },
        ],
      },
    ],
  },

  /**
   * ADMIN PANEL
   */
  {
    path: "/admin",
    element: <RequireAuth />,
    children: [
      {
        element: <RequireRole allowed={["admin"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: adminRoutes,
          },
        ],
      },
    ],
  },

  /**
   * PUBLIC FALLBACK
   */
  {
    path: "*",
    element: <NotFound />,
  },
]);
