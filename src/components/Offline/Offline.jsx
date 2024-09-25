import React from 'react'

function Offline() {

  const reload = ()=>{
    window.location.href = '/'
  }


  return (
    <div className='h-screen flex-col md:flex-row-reverse  flex justify-center md:justify-between md:px-28 px-4 items-center fixed top-0 left-0 right-0 bottom-0 bg-white w-full'>
        {/* <img src={logo} className='w-[282px] object-contain h-[187px] md:w-[330px] md:h-[220px]' /> */}
        <h1 className='md:me-24 font-black text-[80px] flex leading-[2px] h-20 justify-center items-center'><span>4</span><span>0</span> <span>4</span></h1>
        <div className='mt-10 flex flex-col justify-center items-center md:justify-start md:items-start gap-3'>
          <h1 className='sf-bold text-[37px] text-black leading-[44.15px] text-center md:text-start mb-[24px]'>Sorry, <br /> Page Not Found</h1>
          <p className='text-[#6A6A6A] text-[16px] sf-medium-600 leading-[19.09px] text-center md:text-start mb-[24px]'>We Suggest You To Try Reloading The Page</p>
          <button className='w-[116px] text-white h-[42px] bg-black rounded flex justify-center items-center poppins-semibold' onClick={reload}>Reload</button>
        </div>
    </div>
  )
}

export default Offline