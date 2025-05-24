import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="w-screen h-screen flex-1">
      {/* HEADER */}
      <Header />

      <Outlet />

      {/* FOOTER */}
    </div>
  )
};

export default Layout;