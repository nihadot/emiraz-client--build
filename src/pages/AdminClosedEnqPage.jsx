import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../api';
import { ADMIN_TOKEN } from '../api/localstorage-varibles';
import { useNavigate } from 'react-router-dom';
import AddKYC from './AddKYC';
import  Placeholder  from '../assets/placeholder/placeholder-image.png';

function AdminClosedEnqPage() {

    const [data,setData] = useState([]);
  const [refresh,setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/property/property-closed-status/`, {
              headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
            });
            setData(response.data.result)
          } catch (error) {
            throw error || "An error occurred during login.";
          }
    };

    fetchData();
  }, [refresh]);


  return (
    <div className='grid gap-2 grid-cols-1'>

<div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-4xl">View Closed Status</h1>
        </div>
{
    data.length > 0 && data.map((item)=>{
        return(
            <Cards setRefresh={setRefresh} item={item}  />
        )
    })
}
    </div>
  )
}

export default AdminClosedEnqPage





function Cards({item,setRefresh}) {

    const navigate = useNavigate();

    const formatDate = dateString => {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(dateString).toLocaleString('en-US', options);
    };

  return (
    <section className='relative overflow-hidden  '>
{ item?.enquiryDetails?.status && <div className='bg-green-700 w-[84px] text-[8px] text-white text-center uppercase -rotate-[36px] h-[13px] absolute rotate-[360deg  top-[8px] -left-[23px]' style={{transform:"rotate(-35deg"}}>closed</div>}
<div className='h-full px-4 lg:px-0 flex bg-white border rounded-lg gap-2 pt-2 lg:gap-0 mt-0'>
                <div className="   grid gap-2  lg:mt-1 mt-3 w-full py-3 px-3 items-start poppins-medium text-[12px] lg:grid-cols-1 justify-items-start h-full ">
                  <div className=' w-full text-start lg:text-start'>
                    <span className='text-xs font-bold  inline'>Date : </span> {formatDate(item.createdAt)}
                  </div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Name : </span> {item?.enquiryDetails?.name}</div>
                  <div className=' w-full text-start lg:text-start'> <span className='text-xs font-bold  inline'>Number : </span> +{item?.enquiryDetails?.number}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Project : </span> {item?.projectDetails?.projectTitle}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Developer : </span> {item?.developerDetails?.developerName}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Agent Name : </span> {item?.agencyDetails?.name}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Passport Number : </span> {item?.passportNumber}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Agent Name : </span> {item?.agencyDetails?.name}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Email : </span> {item?.email}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Nationality : </span> {item?.countryDetails?.countryName}</div>
                  <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Reason : </span> {item?.reason}</div>
                  {/* <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Email : </span> {item?.email}</div> */}
                  {/* <div className=' w-full text-start lg:text-start capitalize'> <span className='text-xs font-bold  inline'>Status : </span>  <button className='bg-green-700 px-3 capitalize text-[10px] ms-3 py-1 rounded text-white'>{item?.enquiryDetails?.status}</button></div> */}
                  {/* <div className='relative text-start capitalize hidden items-center cursor-pointer justify-center w-[40px] lg:flex'>  */}
                  {/* <FaPen onClick={()=>setToggleNoteBox({id:item._id,status:true})} />
                  { toggleNoteBox.status && toggleNoteBox.id === item._id && <NoteBox refresh={refresh} setRefresh={setRefresh} note={item.note} id={item._id} setToggleNoteBox={setToggleNoteBox}/>}
                   </div> */}
                   {/* pdfFile */}
                   <div className="w-[200px]  h-[200px]">

                 {  item?.pdfFile?.secure_url ?  <iframe
          src={item?.pdfFile?.secure_url}
          className=' object-contain h-full rounded'
          title="PDF Preview"
          width='100%'
          // height={'300px'}
          /> : <div className="w-full h-full rounded bg-slate-200"></div> }
          </div>
                   {/* <img src={item?.imageFile?.secure_url || Placeholder} className='w-60 h-60 object-cover rounded' alt="" /> */}
                   <AddKYC item={item} setRefresh={setRefresh} enqId={item._id}/>
                </div>
             
              </div>

        {/* <div
          className='sf-medium gap-2 text-sm flex flex-col rounded-[5px] px-4 py-2 border shadow-md'
        >
           <label htmlFor=""> Closed enquiry</label>
           <label htmlFor="" className=' capitalize'>Agent Name : {item?.agentDetails?.name}</label>
        </div> */}
    
  </section>
  )
}
