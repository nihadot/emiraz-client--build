import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ManageBlog() {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div onClick={()=>navigate('/admin/add-blog')} className="flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Add Blog</span>
            <span><IoMdAdd/></span>
        </div>
        <div onClick={()=>navigate('/admin/edit-blogs')} className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Edit / Manage Blog</span>
            <span><IoMdAdd/></span>
        </div>
      </div>

      {/* <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div onClick={()=>navigate('/admin/add-developer')} className="flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Add Developer</span>
            <span><IoMdAdd/></span>
        </div>
        <div onClick={()=>navigate('/admin/developers')} className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Edit / Manage Developer</span>
            <span><IoMdAdd/></span>
        </div>
      </div> */}
    </div>
  );
}

export default ManageBlog;
