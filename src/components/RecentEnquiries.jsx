import { useEffect, useRef, useState } from 'react';
import {
  assignedToAgencyAPI,
  getAgency,
  getEnquiries,
  updateEnquiryStatus,
  updateNoteForAdminEnquiry,
  updateToggleLock,
} from '../api';
import { errorToast } from '../toast';
import './index.css';
import { FaPen } from 'react-icons/fa';
import lockIcon from "../assets/icons/lock-svgrepo-com.svg"
import unlockIcon from "../assets/icons/lock-unlocked-svgrepo-com.svg"
function RecentEnquiries({ searchTerm, selectedFilter,selectedFilterDeveloper,selectedFilterAgency }) {
  const [properties, setProprties] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [status, setStatus] = useState({ status: false, id: '' });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const fetchdata = async () => {
    try {
      const response = await getEnquiries();
      setProprties(response.result);
      const agencies = await getAgency();
      setAgencies(agencies.result);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast('An error occurred during login.');
      }
    }
  };

  const [toggleNoteBox,setToggleNoteBox] = useState({id:"",status:false});

  const handleStatus = (status, id) => setStatus({ status, id });

  const statusOfEnq = async (status, id) => {
    try {
      await updateEnquiryStatus({ status, id });
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
      if(selectedFilterDeveloper._id  === 'all'){
        filteredProperties = filteredProperties.filter(item => true == true);
      }else{

        filteredProperties = filteredProperties.filter(
          item => item?.developerId === selectedFilterDeveloper._id
        );
      }
    }
    

    if (selectedFilterAgency) {
      if(selectedFilterAgency._id === 'all'){
        filteredProperties = filteredProperties.filter(item => true == true);
      }else{
        filteredProperties = filteredProperties.filter(
          item => item?.assignedTo === selectedFilterAgency._id
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

  const toggleLockFunction = async(status,id)=>{
    
    try {
      await updateToggleLock( status, id );
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

  const statusComponent = i => {
    return (
      <div key={i} className='relative mx-auto flex items-center justify-center'>
        <div
          onClick={() => handleStatus(!status.status, i._id)}
          className={` capitalize 
                    ${
                      i.status === 'qualified' &&
                      'bg-blue-600 text-[#fff] hover:bg-blue-700'
                    }
                    ${
                      i.status === 'not-interested' &&
                      'bg-red-600 text-[#fff] hover:bg-red-700'
                    }
                    ${
                      i.status === 'interested' &&
                      'bg-orange-600 text-[#fff] hover:bg-orange-600'
                    }
                    ${
                      i.status === 'in-progressive' &&
                      'bg-[#940788]  text-[#fff] hover:bg-[#a7139a]'
                    }
                    ${
                      i.status === 'newlead' &&
                      'bg-gray-950  text-[#fff] hover:bg-gray-900'
                    }
                     ${
                       i.status === 'wrong-number' &&
                       'bg-[#dec228]  text-[#fff] hover:bg-[#c3aa21]'
                     }
                    ${
                      i.status === 'closed' &&
                      'bg-green-600 text-white hover:bg-green-500'
                    }  ${ i.status === 'closed' ? 'w-[92px]' : 'w-[120px]'} text-xs h-7 flex justify-center items-center rounded-[2px] ${i.isLocked ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'}`}
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
        { i?.status === 'closed' && <div title={ i.isLocked ? 'Unlock' : 'Lock' } className={'w-5 h-7 cursor-pointer bg-transparent ms-1'}>
          {i.isLocked ? 
          <img onClick={(e)=> toggleLockFunction('unlock',i._id) } src={lockIcon} alt="lock icon" className='w-full h-full object-contain' /> :
          <img onClick={(e)=> toggleLockFunction('lock',i._id) } src={unlockIcon} alt="lock icon" className='w-full h-full object-contain' /> 
          
          }
          
          </div>}


        {status.status && i._id === status.id && !i.isLocked && (
          <div
            ref={toggleRef}
            className='absolute border top-6 right-7 z-30 border-black/30  capitalize mt-3 poppins-medium flex flex-col gap-1 bg-white shadow-md rounded-md px-2 py-2 text-xs'
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


  // console.log(filteredProperties,'---')
 
  return (
    <div className=' md:h-[85vh] w-full  mt-5 mx-0'>
      <div className='grid bg-gray-200 rounded-lg py-3 w-full text-base sf-medium-600 grid-cols-8 justify-items-center gap-4'>
        <h3 className=' w-full text-center'>Date</h3>
        <h3 className=' w-full text-center'>Name</h3>
        <h3 className=' w-full text-center'>Phone</h3>
        <h3 className=' w-full text-center'>Project</h3>
        <h3 className=' w-full text-center'>Developer</h3>
        <h3 className=' w-[60px] text-center'>Note</h3>
        <h3 className=' w-full text-center'>Assign To</h3>
        <h3 className=' w-full text-center'>Status</h3>
      </div>

      <div className='mt-1 w-full'>
        {filteredProperties && filteredProperties.length > 0 &&
          filteredProperties.map((item, index) => {
            return (
              <div className=' grid bg-gray-200 rounded-lg mt-1 w-full py-3 items-center poppins-medium text-[12px] grid-cols-8 justify-items-center gap-0 '>
                <div className=' w-full text-center'>
                  {formatDate(item.createdAt)}
                </div>
                <div className=' w-full text-center capitalize'>{item?.name}</div>
                <div className=' w-full text-center'>+{item?.number}</div>
                <div className=' w-full text-center capitalize'>{item?.propertyDetails?.projectTitle}</div>
                <div className=' w-full text-center capitalize'>{item?.developerDetails?.developerName}</div>
                <div className='relative text-center capitalize flex items-center cursor-pointer justify-center w-[40px]'> 
                  <FaPen onClick={()=>setToggleNoteBox({id:item._id,status:true})} />
                  { toggleNoteBox.status && toggleNoteBox.id === item._id && <NoteBox refresh={refresh} setRefresh={setRefresh} note={item.note} id={item._id} setToggleNoteBox={setToggleNoteBox}/>}
                   </div>
                <div className=' w-full text-center capitalize'>
                  <AgencyComponent setRefresh={setRefresh} agencies={agencies} item={item} />
                </div>
              
               
                <div className=' w-full text-center capitalize'>{statusComponent(item)}</div>

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

      await updateNoteForAdminEnquiry(id,{note:note});
      setRefresh(!refresh);
      setToggleNoteBox({id:"",status:false});
    } catch (error) {
      errorToast(
        error.response.data.message ||
          error.message ||
          'An error occurred during login.'
      );
    }
  }
  return (
    <div className="z-40 w-[300px] bg-slate-100 p-3 rounded absolute top-2 left-2">

    <textarea cols={10} rows={5} value={note} className='text-slate-600 font-medium rounded w-full py-2  text-xs px-3 outline-none border' placeholder='Type here...' onChange={(e)=>setNote(e.target.value)}  name="" id=""></textarea>
    <div className="text-sm flex gap-3 items-center justify-between mt-2 1">
      <button onClick={()=>setToggleNoteBox({id:"",status:false})} className='text-center bg-slate-200 w-full rounded py-1'>Cancel</button>
      <button onClick={handleSubmit} className='w-full bg-black text-white rounded py-1'>Ok</button>
    </div>
  </div>
  )
}



const AgencyComponent = ({ item: i, agencies = [], setRefresh }) => {
  const handleChangeAgencyComponent = async (agencyId, leadId) => {
    try {
      await assignedToAgencyAPI({ agencyId, leadId });
      setRefresh((prev) => !prev);
    } catch (error) {
      errorToast(
        error.response?.data?.message ||
          error.message ||
          "An error occurred during assignment."
      );
    }
  };

  return (
    <div
      key={i._id}
      className="m-auto w-[100px] bg-black/20 pe-2 overflow-auto h-7 flex justify-center items-center rounded-[4px] cursor-pointer"
    >
      <select
        onChange={(e) =>
          handleChangeAgencyComponent(e.target.value, i._id)
        }
        value={i.assignedTo+'' || "none"}
        className="w-full capitalize h-full text-black bg-transparent outline-none px-3"
      >
        <option value="none" className="capitalize">
          Not Assigned
        </option>
        {agencies.map((item) => (
          <option
            className="capitalize max-w-[150px] text-ellipsis text-white bg-black"
            value={item._id}
            key={item._id}
          >
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};