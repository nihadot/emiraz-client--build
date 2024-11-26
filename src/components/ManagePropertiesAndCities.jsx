import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ManagePropertiesAndCities() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div
          onClick={() => navigate("/admin/add-properties")}
          className="flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer"
        >
          <span className="">Add Project</span>
          <span>
            <IoMdAdd />
          </span>
        </div>
        <div className="cursor-pointer flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]">
          <span onClick={() => navigate("/admin/edit-properties")} className="">
            Edit / Manage Projects
          </span>
          <span>
            <IoMdAdd />
          </span>
        </div>
      </div>
      <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div
          onClick={() => navigate("/admin/add-city")}
          className="flex h-20 lg:h-16  cursor-pointer items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]"
        >
          <span className="">Add City</span>
          <span>
            <IoMdAdd />
          </span>
        </div>
        <div className="cursor-pointer flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]">
          <span onClick={() => navigate("/admin/edit-cities")} className="">
            Edit / Manage Cities
          </span>
          <span>
            <IoMdAdd />
          </span>
        </div>
      </div>
      {/* <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div
          onClick={() => navigate("/admin/add-property-type")}
          className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer"
        >
          <span className="">Add Property Types</span>
          <span>
            <IoMdAdd />
          </span>
        </div>
        <div className="cursor-pointer flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]">
          <span onClick={() => navigate("/admin/view-property-type")} className="">
            Edit / Manage Property Type
          </span>
          <span>
            <IoMdAdd />
          </span>
        </div>
      </div> */}
      


      {/* <div className="flex gap-2 sf-medium font-medium text-2xl"> */}
        {/* <div
          onClick={() => navigate("/admin/sold-projects")}
          className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer"
        >
          <span className="">Sold Projects</span>
          <span>
            <IoMdAdd />
          </span>
        </div> */}
        {/* <div className="cursor-pointer flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]">
          <span onClick={() => navigate("/admin/view-property-type")} className="">
            Edit / Manage Property Type
          </span>
          <span>
            <IoMdAdd />
          </span>
        </div> */}
      {/* </div> */}


    </div>
  );
}

export default ManagePropertiesAndCities;
