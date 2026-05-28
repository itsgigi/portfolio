import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="w-screen h-screen flex-1">
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Header />
      </div>

      <div className="pt-[13vh] h-full">
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;
