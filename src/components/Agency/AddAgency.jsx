import React, {  useState } from "react";
import { errorToast, successToast } from "../../toast";
import { addingAgency} from "../../api";
import {FaEye, FaEyeSlash } from "react-icons/fa";

function AddAgency() {
  const [isLoading,setIsLoading] = useState(false);
  // --------------------------------------------
  // -----------------------------------------------------
  const [formData, setFormData] = useState({
    name: "",
    username:"",
    password: "",
  });

  const[visible,setVisible] = React.useState('password')

  // -----------------------------------------------------



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------------------------

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
    try {
      await addingAgency(formData);
      successToast("Successfully added");
      setFormData({ name: "", username: "", password: "" });
    } catch (error) {
        errorToast(error.response.data.message || error.message || "An error occurred during login.");
    }finally{
      setIsLoading(false)
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      <div className="flex-1">
        {/*  Name */}
        <div className="flex flex-col gap-2 mx-3">
          <label
            htmlFor="name"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
             Name
          </label>
          <input
            disabled={isLoading}
            autoComplete="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
            type="text"
            id="name"
            placeholder="Name"
            title="Name"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col mt-3 gap-2 mx-3">
          <label
            htmlFor="username"
            className="sf-medium font-medium text-sm text-[#000000]"
          >
            Username
          </label>
          <input
            disabled={isLoading}
            autoComplete=""
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            id="username"
            placeholder="Username"
            className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] sf-normal font-extralight text-sm text-[#666666]  outline-none"
          />
        </div>

        <div className="relative flex flex-col gap-2 mt-3 mx-3">
        <label htmlFor="password" className="sf-medium font-medium text-sm text-[#000000]">Password</label>
        <input disabled={isLoading} name="password" onChange={handleChange} value={formData.password} autoComplete="current-password" type={visible} id="password" placeholder="Password" className="border border-[#E4E4E4] py-4 ps-5 pe-16 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none" />
        <div className="absolute right-7   top-11">
            {
                visible === 'password' ? <FaEye size={20} onClick={()=>setVisible('text')} /> : <FaEyeSlash size={20} onClick={()=> setVisible('password')}/>
            }
        </div>

        <div className="p-0 mt-1 poppins-semibold text-lg">
          <button disabled={isLoading} type="submit" className="w-52 h-11 bg-[#000000] text-[#ffffff] hover:bg-[#666666] flex justify-center items-center rounded-[4px] cursor-pointer">
            
              { isLoading ? 'loading...' :  'Save'}
            
          </button>
        </div>
      </div>


        
      </div>

      <div className="px-4 flex-1">
    
      </div>
    </form>
  );
}

export default AddAgency;
