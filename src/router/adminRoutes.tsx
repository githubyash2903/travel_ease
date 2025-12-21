import type { RouteObject } from "react-router-dom";

import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminUsers from "@/pages/Admin/AdminUsers";
import AdminCoupons from "@/pages/Admin/AdminCoupons";
import AdminBookings from "@/pages/Admin/AdminBookings";
import AdminSettings from "@/pages/Admin/AdminSettings";
import AdminAPIManager from "@/pages/Admin/AdminAPIManager";
import AdminHolidayPackages from "@/pages/Admin/AdminHolidayPackages";
import AdminHotelsPage from "@/pages/Admin/AdminHotels";
import AdminRoomsPage from "@/pages/Admin/AdminRoomsPage";
import AdminFlightsPage from "@/pages/Admin/AdminFlightsPage";

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
    element: <AdminBookings />,
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
    element: <AdminHolidayPackages />,
  },
];

export default adminRoutes;
