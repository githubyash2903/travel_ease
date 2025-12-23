import type { RouteObject } from "react-router-dom";

import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminUsers from "@/pages/Admin/AdminUsers";
import AdminCoupons from "@/pages/Admin/AdminCoupons";
import AdminSettings from "@/pages/Admin/AdminSettings";
import AdminAPIManager from "@/pages/Admin/AdminAPIManager";
import AdminHotelsPage from "@/pages/Admin/AdminHotels";
import AdminRoomsPage from "@/pages/Admin/AdminRoomsPage";
import AdminFlightsPage from "@/pages/Admin/AdminFlightsPage";
import AdminHolidayPackagesPage from "@/pages/Admin/AdminHolidayPackagesPage";
import AdminBookingsPage from "@/pages/Admin/AdminBookingsPage";

const adminRoutes: RouteObject[] = [
  {
    index: true,
    element: <AdminDashboard />,
  },
  {
    path: "users",
    element: <AdminUsers />,
  },
  {
    path: "hotels",
    element: <AdminHotelsPage />,
  },
  {
    path: "rooms",
    element: <AdminRoomsPage />,
  },
  {
    path: "flights",
    element: <AdminFlightsPage />,
  },
  {
    path: "coupons",
    element: <AdminCoupons />,
  },
  {
    path: "bookings",
    element: <AdminBookingsPage />,
  },
  {
    path: "settings",
    element: <AdminSettings />,
  },
  {
    path: "api-manager",
    element: <AdminAPIManager />,
  },
  {
    path: "packages",
    element: <AdminHolidayPackagesPage />,
  },
];

export default adminRoutes;
