import type { RouteObject } from "react-router-dom";

const Profile: RouteObject = {
  path: "profile",
  lazy: async () => {
    const Profile = await import("@/pages/Profile");
    return { Component: Profile.default };
  },
};
export default Profile;
