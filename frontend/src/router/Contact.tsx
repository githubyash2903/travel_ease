import type { RouteObject } from "react-router-dom";

const Contact: RouteObject = {
  path: "contact",
  lazy: async () => {
    const Contact = await import("@/pages/Contact");
    return { Component: Contact.default };
  },
};
export default Contact;