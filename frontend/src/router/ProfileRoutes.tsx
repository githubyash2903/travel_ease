import ProfileLayout from "@/components/layout/ProfileLayout";
import type { RouteObject } from "react-router-dom";

const ProfileRoutes: RouteObject[] = [
  {
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const Profile = await import("@/pages/User/Profile");
          return { Component: Profile.default };
        },
      },
      {
        path: "bookings",
        lazy: async () => {
          const Bookings = await import("@/pages/User/Bookings");
          return { Component: Bookings.default };
        },
      },
      {
        path: "payments",
        lazy: async () => {
          const Bookings = await import("@/pages/User/Payments");
          return { Component: Bookings.default };
        },
      },
    ],
  },
];
export default ProfileRoutes;
