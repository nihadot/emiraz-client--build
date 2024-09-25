import { useEffect, useState } from 'react'
import City from "../components/City"
import { fetchCities, setError, setLoading } from '../features/citiesSlice'
import { useDispatch, useSelector } from 'react-redux';
import { getCities } from '../api';
import { errorToast } from '../toast';

function EditCitiesPage() {

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.city); 
  const [refresh,setRefresh] = useState(true);

  useEffect(()=>{
    fetchdata()
  },[refresh])

  const fetchdata =async ()=>{
    try {
      dispatch(setLoading());
      const response = await getCities()
      dispatch(fetchCities(response));

    } catch (error) {
      if (error.response && error.response.data) {
        dispatch(setError(error.response.data.message));
        errorToast(error.response.data.message)
      } else {
        dispatch(setError('An error occurred during login.'));
        errorToast('An error occurred during login.');
      }
    }
    }

  return (
    <div>
      <div className="h-fit">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium  font-medium text-5xl">Cities</h1>
        </div>
        <div className=" grid grid-cols-5 overflow-scroll">
            {data.map((item)=> <City refresh={refresh} setRefresh={setRefresh} key={item._id} item={item} /> )}
        </div>
      </div>
    </div>
  )
}

export default EditCitiesPage