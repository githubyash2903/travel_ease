import type { RouteObject } from "react-router-dom";

const FAQs: RouteObject = {
  path: "faqs",
  lazy: async () => {
    const FAQsPage = await import("@/pages/FAQs");
    return { Component: FAQsPage.default };
  },
};
export default FAQs;