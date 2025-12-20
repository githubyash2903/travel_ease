import type { RouteObject } from "react-router-dom";

const Support: RouteObject = {
  path: "support",
  lazy: async () => {
    const SupportPage = await import("@/pages/Support");
    return { Component: SupportPage.default };
  },
};
export default Support;