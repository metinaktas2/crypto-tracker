import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-100 transition-colors flex flex-col ">
      <Header />
      <main className="container flex-1 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
