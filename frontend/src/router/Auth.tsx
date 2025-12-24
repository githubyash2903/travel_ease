import type { RouteObject } from "react-router-dom";

const Auth: RouteObject = {
  path: "auth",
  lazy: async () => {
    const { LoginSignup } = await import("@/pages/LoginSignup");
    return { Component: LoginSignup };
  },
};

export default Auth;
