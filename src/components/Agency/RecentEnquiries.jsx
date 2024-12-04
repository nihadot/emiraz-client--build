import { useEffect, useRef, useState } from 'react';

import { errorToast } from '../../toast';
import { getEnquiries, getEnquiriesByAgency, updateEnquiryStatus, updateEnquiryStatusAgencyAPI, updateNoteForAdminEnquiry, updateNoteForAgencyEnquiry, updateToggleLock, updateToggleLockAgency } from '../../api';
import lockIcon from "../../assets/icons/lock-svgrepo-com.svg";
import unlockIcon from "../../assets/icons/lock-unlocked-svgrepo-com.svg"
import {phoneCall,whatsappCall} from "../../assets/icons"
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
function RecentEnquiries({ searchTerm, selectedFilter, selectedFilterDeveloper, selectedFilterAgency }) {
  const [properties, setProprties] = useState([]);
  const [status, setStatus] = useState({ status: false, id: '' });
  const [refresh, setRefresh] = useState(false);
const navigate = useNavigate();
  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const [toggleNoteBox,setToggleNoteBox] = useState({id:"",status:false});

  const fetchdata = async () => {
    try {
      const response = await getEnquiriesByAgency();
      setProprties(response.result);
    } catch (error) {
      errorToast(error.response.data.message || error.message || 'An error occurred during login.');

    }
  };


  const toggleLockFunction = async (status, id) => {

    try {
      await updateToggleLockAgency(status, id);
      // setStatus({ status: false, id: '' });
      setRefresh(!refresh);
    } catch (error) {
      errorToast(
        error.response.data.message ||
        error.message ||
        'An error occurred during login.'
      );
    }
  }

  const handleStatus = (status, id) => setStatus({ status, id });

  const statusOfEnq = async (status, id) => {
    try {
      await updateEnquiryStatusAgencyAPI({ status, id });
      setStatus({ status: false, id: '' });
      setRefresh(!refresh);
    } catch (error) {
      errorToast(
        error.response.data.message ||
        error.message ||
        'An error occurred during login.'
      );
    }
  };
  const filterAndSortProperties = () => {
    const lowerCaseSearchTerm = searchTerm?.toLowerCase();
    let filteredProperties = properties.filter(item => {
      const searchFields = [
        item._id,
        item.name,
        item.number,
        item.propertyName,
        item.developerName,
        item.status,
      ];

      return searchFields.some(
        field => field && field.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });

    if (selectedFilter) {
      switch (selectedFilter) {
        case 'closed':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'closed'
          );
          break;
        case 'all':
          filteredProperties = filteredProperties.filter(item => true == true);
          break;
        case 'in-progressive':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'in-progressive'
          );
          break;
        case 'interested':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'interested'
          );
          break;
        case 'agent':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'agent'
          );
          break;
        case 'qualified':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'qualified'
          );
          break;
        case 'not-interested':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'not-interested'
          );
          break;
        case 'newlead':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'newlead'
          );
          break;
        case 'wrong-number':
          filteredProperties = filteredProperties.filter(
            item => item?.status?.toLocaleString() === 'wrong-number'
          );
          break;
        default:
          break;
      }
    }

    if (selectedFilterDeveloper) {
      if (selectedFilterDeveloper._id === 'all') {
        filteredProperties = filteredProperties.filter(item => true == true);
      } else {

        filteredProperties = filteredProperties.filter(
          item => item?.developerId === selectedFilterDeveloper._id
        );
      }
    }


    if (selectedFilterAgency) {
      // console.log(selectedFilterAgency,'selectedFilterAgency')
      if (selectedFilterAgency._id === 'all') {
        filteredProperties = filteredProperties.filter(item => true == true);
      } else {
        filteredProperties = filteredProperties.filter(
          item => item?.assignedId === selectedFilterAgency._id
        );
      }
    }

    return filteredProperties;
  };
  const toggleRef = useRef(null);

  const filteredProperties = filterAndSortProperties();

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

  const statusComponent = i => {
    return (
      <div className='relative mx-auto flex items-center justify-start lg:justify-center'>
        <div
          onClick={() => handleStatus(!status.status, i._id)}
          className={` capitalize 
                    ${i.status === 'qualified' &&
            'bg-blue-600 text-[#fff] hover:bg-blue-700'
            }
                    ${i.status === 'not-interested' &&
            'bg-red-600 text-[#fff] hover:bg-red-700'
            }
                    ${i.status === 'interested' &&
            'bg-orange-600 text-[#fff] hover:bg-orange-600'
            }
                    ${i.status === 'in-progressive' &&
            'bg-[#940788]  text-[#fff] hover:bg-[#a7139a]'
            }
                    ${i.status === 'newlead' &&
            'bg-gray-950  text-[#fff] hover:bg-gray-900'
            }
                     ${i.status === 'wrong-number' &&
            'bg-[#dec228]  text-[#fff] hover:bg-[#c3aa21]'
            }
                    ${i.status === 'closed' &&
            'bg-green-600 text-white hover:bg-green-500'
            }   ${i.status === 'closed' ? 'w-[92px]' : 'w-[120px]'} ${i.isLocked ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'} text-xs h-7 flex justify-center items-center rounded-[2px] `}
        >
          <span className={`capitalize`}>
            {i?.status === 'newlead'
              ? 'New Lead'
              : i?.status === 'not-interested'
                ? 'Not Interested'
                : i.status === 'in-progressive'
                  ? 'In Progress'
                  : i.status === 'wrong-number'
                    ? 'Wrong Number'
                    : i.status}
          </span>
        </div>

        {i?.status === 'closed' && <div title={i.isLocked ? '(you have not permission to unlock)' : 'Lock'} className={`w-5 h-7 cursor-pointer bg-transparent ms-1 `}>
          {i.isLocked ?
            <img src={lockIcon} alt="lock icon" className='w-full h-full object-contain opacity-55 cursor-not-allowed' /> :
            <img onClick={(e) => toggleLockFunction('lock', i._id)} src={unlockIcon} alt="lock icon" className='w-full h-full object-contain' />

          }
        </div>}

        {status.status && i._id === status.id && !i.isLocked && (
          <div
            ref={toggleRef}
            className='absolute border top-6 -left-[30px] w-fit right-0 z-30 border-black/30  capitalize mt-3 poppins-medium flex flex-col gap-1 bg-white shadow-md rounded-md px-2 py-2 text-xs'
          >
            <div
              onClick={() => statusOfEnq('qualified', i._id)}
              className={`bg-blue-600 text-[#fff] hover:bg-blue-700 w-36 h-7  flex justify-center items-center rounded-[4px] cursor-pointer`}
            >
              <span>qualified</span>
            </div>

            <div
              onClick={() => statusOfEnq('not-interested', i._id)}
              className='w-36 h-7  bg-red-600 text-[#fff] hover:bg-red-700 flex justify-center items-center rounded-[4px] cursor-pointer'
            >
              <span>Not Interested</span>
            </div>

            <div
              onClick={() => statusOfEnq('interested', i._id)}
              className='w-36 h-7 bg-orange-600 text-[#fff] hover:bg-orange-600 flex justify-center items-center rounded-[4px] cursor-pointer'
            >
              <span>interested</span>
            </div>
            <div
              onClick={() => statusOfEnq('in-progressive', i._id)}
              className='w-36 h-7 bg-[#940788] text-[#fff] hover:bg-[#a7139a] flex justify-center items-center rounded-[4px] cursor-pointer'
            >
              <span>In Progress</span>
            </div>
            <div
              onClick={() => statusOfEnq('closed', i._id)}
              className='w-36 h-7 bg-green-600 text-[#ffffff] hover:bg-green-500 flex justify-center items-center rounded-[4px] cursor-pointer'
            >
              <span>closed</span>
            </div>
            <div
              onClick={() => statusOfEnq('newlead', i._id)}
              className='w-36 h-7 bg-black text-[#ffffff] hover:bg-black flex justify-center items-center rounded-[4px] cursor-pointer'
            >
              <span>New Lead</span>
            </div>
            <div
              onClick={() => statusOfEnq('wrong-number', i._id)}
              className='w-36 h-7 bg-[#dec228] text-[#fff] hover:bg-[#c3aa21] flex justify-center items-center rounded-[4px] cursor-pointer'
            >
              <span>Wrong Number</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (status.status && toggleRef.current) {
      toggleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [status.status]);


  return (
    <div className=' md:h-[85vh] h-screen w-full mt-0 md:mt-5 mx-0'>
      <div className='lg:grid hidden bg-gray-200 rounded-lg py-3 w-full text-base sf-medium-600 grid-cols-7 justify-items-center gap-4'>
        <h3 className=' w-full text-center'>Date</h3>
        <h3 className=' w-full text-center'>Name</h3>
        <h3 className=' w-full text-center'>Phone</h3>
        <h3 className=' w-full text-center'>Project</h3>
        <h3 className=' w-full text-center'>Developer</h3>
        <h3 className=' w-[60px] text-center'>Note</h3>
        <h3 className=' w-full text-center'>Status</h3>
      </div>

      <div className='mt-1 w-full'>
        {filteredProperties && filteredProperties.length > 0 &&
          filteredProperties.map((item, index) => {
            return (
              <div className='h-full px-4 lg:px-0 flex bg-gray-200 rounded-lg gap-2 lg:gap-0 mt-1'>
                <div className="   grid   lg:mt-1 mt-3 w-full py-3 items-center poppins-medium text-[12px] lg:grid-cols-7 justify-items-center  ">
                  <div className=' w-full text-start lg:text-center'>
                    <span className='text-xs font-bold lg:hidden inline'>Date : </span> {formatDate(item.createdAt)}
                  </div>
                  <div className=' w-full text-start lg:text-center capitalize'> <span className='text-xs font-bold lg:hidden inline'>Name : </span> {item?.name}</div>
                  <div className=' w-full text-start lg:text-center'> <span className='text-xs font-bold lg:hidden inline'>Number : </span> +{item?.number}</div>
                  <div className=' w-full text-start lg:text-center capitalize'> <span className='text-xs font-bold lg:hidden inline'>Project : </span> {item?.propertyDetails?.projectTitle}</div>
                  <div className=' w-full text-start lg:text-center capitalize'> <span className='text-xs font-bold lg:hidden inline'>Developer : </span> {item?.developerDetails?.developerName}</div>
                  <div className='relative text-center capitalize hidden items-center cursor-pointer justify-center w-[40px] lg:flex'> 
                  <FaPen onClick={()=>setToggleNoteBox({id:item._id,status:true})} />
                  { toggleNoteBox.status && toggleNoteBox.id === item._id && <NoteBox refresh={refresh} setRefresh={setRefresh} note={item.note} id={item._id} setToggleNoteBox={setToggleNoteBox}/>}
                   </div>
                  <div className=' w-full text-start lg:text-center capitalize hidden lg:flex'>{statusComponent(item)}</div>
                </div>
                <div className="justify-center flex flex-col gap-2  items-center ">
                <div className=' w-full text-start lg:text-center capitalize flex lg:hidden'>{statusComponent(item)}</div>
                {/* <div className=' w-full text-start lg:text-center capitalize flex lg:hidden'>
                  <div onClick={()=> window.open(`tel:${item?.number}`, '_blank')} className="bg-black flex rounded w-[120px] justify-center gap-3 px-3 py-1 poppins-medium text-[12px] ">
                  <img src={phoneCall} alt="" />
                  <label htmlFor="" className='text-white'>Call</label>
                  </div>
                </div> */}
                
                {/* <div onClick={()=> window.open(`https://wa.me/${item?.number}?text=Hello`, '_blank')} className="bg-green-600 flex lg:hidden rounded w-[120px] justify-center gap-3 px-3 py-1 poppins-medium text-[12px] ">
                  <img  src={whatsappCall} alt="" />
                  <label  htmlFor="" className='text-white'>Whatsapp</label>
                  </div>   */}
                  
                <div className='relative  mt-4 text-center capitalize flex items-center cursor-pointer justify-center w-full lg:hidden'> 
                  <FaPen onClick={()=>setToggleNoteBox({id:item._id,status:true})} />
                  { toggleNoteBox.status && toggleNoteBox.id === item._id && <NoteBox refresh={refresh} setRefresh={setRefresh} note={item.note} id={item._id} setToggleNoteBox={setToggleNoteBox}/>}
                   </div>


                  {/* <div className=' w-full text-start lg:text-center capitalize flex lg:hidden'>
                  <div  className="bg-black flex rounded w-[120px] justify-center gap-3 px-3 py-1 poppins-medium text-[12px] ">
                  </div>
                </div> */}


            
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RecentEnquiries;








function NoteBox({setToggleNoteBox,id,note:existNote,setRefresh,refresh}) {

  const [note,setNote] = useState();


  useEffect(()=>{
setNote(existNote)
  },[])


  const handleSubmit = async()=>{
    try {

      await updateNoteForAgencyEnquiry(id,{note:note});
      setRefresh(!refresh);
      setToggleNoteBox({id:"",status:false});
    } catch (error) {
      errorToast(
        error?.response?.data?.message ||
          error?.message ||
          'An error occurred during login.'
      );
    }
  }
  return (
    <div className="z-40 min-w-[200px] md:w-[300px] bg-slate-100 p-3 rounded absolute top-2 -left-40 lg:-left-14">

    <textarea cols={10} rows={5} value={note} className='text-slate-600 font-medium rounded w-full py-2  text-xs px-3 outline-none border' placeholder='Type here...' onChange={(e)=>setNote(e.target.value)}  name="" id=""></textarea>
    <div className="text-sm flex gap-3 items-center justify-between mt-2 1">
      <button onClick={()=>setToggleNoteBox({id:"",status:false})} className='text-center bg-slate-200 w-full rounded py-1'>Cancel</button>
      <button onClick={handleSubmit} className='w-full bg-black text-white rounded py-1'>Ok</button>
    </div>
  </div>
  )
}
