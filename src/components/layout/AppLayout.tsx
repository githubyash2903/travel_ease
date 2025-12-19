import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";


const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header /> 
      <Outlet />   
      <Footer />
    </div>
  );
};

export default AppLayout;