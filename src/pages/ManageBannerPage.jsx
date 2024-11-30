import { useNavigate } from "react-router-dom";
import ManageBanner from "../components/ManageBanner";
import ManageBannerClients from "../components/ManageBannerClients";
import ManageSideBanner from "../components/ManageSideBanner";
import { IoMdAdd } from "react-icons/io";

function ManageBannerPage() {

  const navigate = useNavigate();
  return (
    <div>
      <div className="">
        <div className="flex justify-between my-6">
          <h1 className="sf-medium font-medium text-5xl">Manage Banner</h1>
        </div>
        <div className="mb-2">
          <ManageBanner />
        </div>
        {/* <div className="mb-2">
          <ManageBannerClients />
        </div> */}
        <div className="mb-2">
          <ManageSideBanner />
        </div>

        {/* <div onClick={()=>navigate('/admin/view-all-ads')} className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]">
            <span  className="gap-2 sf-medium font-medium text-2xl capitalize ">View All Ads without properties</span>
            <span><IoMdAdd/></span>
        </div> */}
      </div>
    </div>
  );
}

export default ManageBannerPage;
