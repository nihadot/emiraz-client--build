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

            
         


      </div>
    </div>
  )
}

export default ManageBlogPage