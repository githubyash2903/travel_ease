import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from '@/context/AuthContext';
import AppProvider from './provider/AppProvider';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AppLayout from '@/components/layout/AppLayout';
import AdminLayout from './components/layout/AdminLayout';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';

const router = createBrowserRouter([
   {
  
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: publicRoutes,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
]);


const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
       <ToastContainer
position="bottom-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
// transition={Bounce}
/>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  </StrictMode>,
);