import type { RouteObject } from "react-router-dom";

import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminUsers from "@/pages/Admin/AdminUsers";
import AdminHotelsPage from "@/pages/Admin/AdminHotels";
import AdminRoomsPage from "@/pages/Admin/AdminRoomsPage";
import AdminFlightsPage from "@/pages/Admin/AdminFlightsPage";
import AdminHolidayPackagesPage from "@/pages/Admin/AdminHolidayPackagesPage";
import AdminBookingsPage from "@/pages/Admin/AdminBookingsPage";
import { AdminContactMessagesPage } from "@/pages/Admin/AdminContactMessagesPage";

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
    path: "bookings",
    element: <AdminBookingsPage />,
  },
  {
    path: "contact-messages",
    element: <AdminContactMessagesPage />,
  },
  {
    path: "packages",
    element: <AdminHolidayPackagesPage />,
  },
];

export default adminRoutes;
