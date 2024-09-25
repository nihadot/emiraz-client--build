import LefAdminPanel from "./LefAdminPanel";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex mx-3 flex-row items-center justify-start  min-h-screen">
      <LefAdminPanel />
      <div className=" lg:ps-[245px] lg:pe-5 w-full h-[98vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
