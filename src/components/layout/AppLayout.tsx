import { Outlet } from "react-router-dom";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

const AppLayout = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      {/* Main content */}
      <main className="flex-1 flex justify-center w-screen">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
