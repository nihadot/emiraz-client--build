import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ManageAgencies() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div
          onClick={() => navigate("/admin/add-agencies")}
          className="flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer"
        >
          <span className="">Add Agent</span>
          <span>
            <IoMdAdd />
          </span>
        </div>
        <div className="cursor-pointer flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF]">
          <span onClick={() => navigate("/admin/view-agencies")} className="">
            View Agents
          </span>
          <span>
            <IoMdAdd />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ManageAgencies;
