import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftAgencyPanel from "./LeftAgencyPanel"

function Layout() {
  return (
    <div className="flex mx-3 flex-row items-center justify-start  min-h-screen">
      <LeftAgencyPanel />
      <div className=" lg:ps-[245px] lg:pe-5 w-full h-[98vh]">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout