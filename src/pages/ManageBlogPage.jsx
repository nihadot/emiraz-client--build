import { useNavigate } from "react-router-dom";
import ManageBlog from "../components/ManageBlog.jsx"
import { IoMdAdd } from "react-icons/io";

function ManageBlogPage() {

  const navigate = useNavigate();

  return (
    <div>
        <div className="">
            <div className="flex justify-between my-6">
                <h1 className="sf-medium font-medium text-5xl">Manage Blog</h1>
            </div>
            <ManageBlog />

            
            <div className="flex flex-col gap-3 mt-3">
      <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div onClick={()=>navigate('/admin/add-language')} className="flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Add Language</span>
            <span><IoMdAdd/></span>
        </div>
        <div onClick={()=>navigate('/admin/view-language')} className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Edit / Manage </span>
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




    <div className="flex flex-col gap-3 mt-3">
      <div className="flex gap-2 sf-medium font-medium text-2xl">
        <div onClick={()=>navigate('/admin/add-country')} className="flex h-20 lg:h-16  items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Add Country</span>
            <span><IoMdAdd/></span>
        </div>
        <div onClick={()=>navigate('/admin/view-country')} className="flex h-20 lg:h-16   items-center  flex-1 justify-between px-6 rounded-[10px] bg-[#000000] text-[#FFFFFF] cursor-pointer">
            <span className="">Edit / Country </span>
            <span><IoMdAdd/></span>
        </div>
      </div>

    </div>


      </div>
    </div>
  )
}

export default ManageBlogPage