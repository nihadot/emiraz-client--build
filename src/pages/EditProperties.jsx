import { useEffect, useState } from 'react'
import Cards from "../components/Cards"
import { deleteProperties, getProperties } from '../api'
import { errorToast } from '../toast'
import { fetchProperties, setError, setLoading } from '../features/propertiesSlice'
import { useDispatch, useSelector } from 'react-redux';


function EditProperties() {

  const dispatch = useDispatch();
const [data,setData] = useState([]);
  const [refresh,setRefresh] = useState(true);
  

  useEffect(()=>{
    fetchdata()
  },[refresh])

  const fetchdata =async ()=>{
    try {
      const response = await getProperties();
      setData(response?.result);
    } catch (error) {
   
        errorToast(error?.response?.data?.message || error?.message || 'Error occurred while fetching properties')
  
    }
    }

    const handleDelete = async(id)=>{
      console.log(id)
      try {
        await deleteProperties(id)
        setRefresh(!refresh)
      } catch (error) {
        return errorToast(error.response.data.message || error.message || 'error occurs!')
      }
    }
    
  return (
    <div className="">
         <div className="sticky z-50 top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">View Projects</h1>
        </div>
    <div className='grid h-fit grid-cols-3 gap-2 flex-wrap'>
       
        { data && data?.map((item)=> <Cards view handleDelete={handleDelete} refresh={refresh} setRefresh={setRefresh} key={item._id} item={item} /> )}
    </div>
    </div>
  )
}

export default EditProperties