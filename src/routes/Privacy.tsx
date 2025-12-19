import type { RouteObject } from "react-router-dom";

const Privacy: RouteObject = {
  path: "privacy",
  lazy: async () => {
    const Privacy = await import("@/pages/Privacy");
    return { Component: Privacy.default };
  },
};
export default Privacy;
