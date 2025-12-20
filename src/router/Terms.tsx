import type { RouteObject } from "react-router-dom";

const Terms: RouteObject = {
  path: "terms",
  lazy: async () => {
    const TermsPage = await import("@/pages/Terms");
    return { Component: TermsPage.default };
  },
};
export default Terms;