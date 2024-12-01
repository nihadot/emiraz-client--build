import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { errorToast, successToast } from "../../toast";
import { adminLoginAPI, agencyLoginAPI } from "../../api";
import { ADMIN_TOKEN, AGENCY_ID, AGENCY_TOKEN } from "../../api/localstorage-varibles";

function Login() {

    const[visible,setVisible] = React.useState('password')
    const[formdata,setFormdata] = React.useState({username:'',password:''})
    const [isLoading,setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!formdata.username) return errorToast('Username is required');
        if(!formdata.password) return errorToast('Password is required');
        setLoading(true);
        try {
          const user = await agencyLoginAPI(formdata);
          localStorage.setItem(AGENCY_TOKEN,user?.token)
          localStorage.setItem(AGENCY_ID,user?.result?._id)
         
          successToast('Logged in successfully')
          navigate('/agent-dashboard')
        } catch (error) {
        
            errorToast(error.response.data.message || error.message || 'An error occurred during login.');
         
        }finally{
        setLoading(false);
        }
    }

    const handleChange = (e)=>{
        setFormdata({...formdata,[e.target.name]:e.target.value})
    }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-2 md:mx-0">
      <div className="sf-medium font-medium text-center mb-10">
        <h1 className="text-[#000000] text-5xl ">Welcome Agent Login</h1>
        <p className=" text-sm text-[#666666] mt-1">Enter your credentials to access Admin Panel</p>
      </div>
      <div className="flex flex-col gap-2 mx-3">
        <label htmlFor="username" className="sf-medium font-medium text-sm text-[#000000] capitalize">username</label>
        <input disabled={isLoading} autoComplete="name" name="username" onChange={handleChange} value={formdata.email} type="text" id="username" placeholder="Enter your username" className="border border-[#E4E4E4] py-4 px-5 rounded-[10px] font-extralight sf-normal text-sm text-[#666666]  outline-none" />
      </div>
      <div className="relative flex flex-col gap-2 mt-3 mx-3">
        <label htmlFor="password" className="sf-medium font-medium text-sm text-[#000000]">Password</label>
        <input disabled={isLoading} name="password" onChange={handleChange} value={formdata.password} autoComplete="current-password" type={visible} id="password" placeholder="Enter your Password" className="border border-[#E4E4E4] py-4 ps-5 pe-16 rounded-[10px] sf-normal text-sm text-[#666666]  outline-none" />
        <div className="absolute right-7   top-11">
            {
                visible === 'password' ? <FaEye size={20} onClick={()=>setVisible('text')} /> : <FaEyeSlash size={20} onClick={()=> setVisible('password')}/>
            }
        </div>
      </div>
      <div className="flex flex-row justify-between gap-2 mt-3 sf-normal font-extralight text-sm text-[#000000] mx-3">
        <div className="flex  items-center gap-2">
            <input required  type="checkbox" name="checkbox" id="checkbox" />
            <label   htmlFor="checkbox">Remember me</label>
        </div>
        <Link to={'/'} >
            <label htmlFor="password" className="cursor-pointer">Forgot Password</label>
        </Link>
      </div>
      <div className="mt-8 mx-3">
        <button type="submit" disabled={isLoading} className="rounded-[10px] bg-[#000000] sf-bold text-xl text-[#ffffff] text-center w-full py-6">{ isLoading ? 'Loading...' :  'Sign In'}</button>
      </div>
    </form>
  );
}

export default Login;
