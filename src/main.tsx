import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./index.css";
import { AuthProvider } from "@/context/AuthContext";
import AppProvider from "./provider/AppProvider";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./router";

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  </StrictMode>
);
