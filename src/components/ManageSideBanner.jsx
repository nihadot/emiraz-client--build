import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ManageSideBanner() {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div onClick={()=>navigate('/admin/add-side-banner')} className="flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="capitalize">Add Ads</span>
            <span><IoMdAdd/></span>
        </div>
        <div onClick={()=>navigate('/admin/view-side-banner')} className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]">
            <span className="">View Ads</span>
            <span><IoMdAdd/></span>
        </div>
      </div>
    </div>
  );
}

export default ManageSideBanner;
