import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./index.css";
import { AuthProvider } from "@/context/AuthContext";
import AppProvider from "./provider/AppProvider";
import "react-toastify/dist/ReactToastify.css";
import { router } from "./router";
import { Toaster } from "./components/ui/toaster";

const container = document.getElementById("root") as HTMLElement;

createRoot(container).render(
  <StrictMode>
    <TooltipProvider>
      <Toaster />
      <Sonner />
    <AuthProvider>
      <AppProvider>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
    </TooltipProvider>
  </StrictMode>
);
