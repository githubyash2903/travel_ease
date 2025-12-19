import type { RouteObject } from "react-router-dom";

const Blogs: RouteObject = {
  path: "blogs",
  children: [
    {
      index: true,
      lazy: async () => {
        const Blogs = await import("@/pages/Blogs/Blogs");
        return { Component: Blogs.default };
      },
    },
    {
      path: ":id",
      lazy: async () => {
        const blogs = await import("@/pages/Blogs/BlogDetail");
        return { Component: blogs.default };
      },
    },
  ],
};
export default Blogs;
