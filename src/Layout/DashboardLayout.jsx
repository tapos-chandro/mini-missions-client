import { Outlet, useNavigate } from "react-router-dom";
import SideNav from "../Pages/Deshboard/SideNav";
import DashboardNav from "../Pages/Deshboard/DashboardNav";
import Footer from "../components/Footer";
import useUserData from "../Hooks/useUserData";
import { useEffect } from "react";

const DashboardLayout = () => {

  const [userData] = useUserData();

  return (
    <div className="min-h-screen container mx-auto border border-gray-200  flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="shadow bg-white">
        <DashboardNav />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 shadow-md p-4 hidden md:block">
          <SideNav />
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="bg-white shadow rounded-2xl p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default DashboardLayout;
