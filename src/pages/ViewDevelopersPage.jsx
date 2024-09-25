import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { errorToast, successToast } from '../toast';
import { setError, setLoading } from '../features/blogSlice.js';
import { MAIN_IMAG_URL, deleteDeveloper, getDevelopers } from '../api/';
import { deleteDeveloperSuccess, fetchDevelopers } from '../features/developerSlice.js';
import Profile from "../components/Profile.jsx"
import Lazyloading from '../components/Lazyloading/Lazyloading.jsx';
import { useNavigate } from 'react-router-dom';

function ViewDevelopersPage() {

  const dispatch = useDispatch();
  const { developers } = useSelector((state) => state.developer); 
  const [refresh,setRefresh] = React.useState(true);

  React.useEffect(()=>{
    fetchdata()
  },[refresh])

  const fetchdata =async ()=>{
    try {
      dispatch(setLoading());
      const response = await getDevelopers()
      dispatch(fetchDevelopers(response));

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

    const navigate = useNavigate();

    const handleDelete = async (id) => {
      if (!id) return errorToast("Id Is Not Provided!");
  
      try {
        dispatch(setLoading());
        await deleteDeveloper(id);
        dispatch(deleteDeveloperSuccess());
        successToast("Successfully Deleted");
        setRefresh(!refresh);
      } catch (error) {
        if (error.response && error.response.data) {
          dispatch(setError(error.response.data.message));
          errorToast(error.response.data.message);
        } else {
          dispatch(setError("An error occurred during login."));
          errorToast("An error occurred during login.");
        }
      }
    };

  return (
        <>
    {/* <div className=" sm:flex gap-3 md:gap-8 grid grid-cols-2 sm:justify-center sm:items-center sm:flex-wrap mx-6 ">
        {developers && developers.map((item)=> <Profile refresh={refresh} setRefresh={setRefresh} key={item._id} item={item} /> )}

    </div> */}

    
    <div className="mx-0 my-4 lg:my-14 items-center  ">
            <section className="mt-5 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3  mb-5 gap-7 max-w-[1300px]">
                
                  {developers &&
                    developers.length > 0 &&
                    developers.map((item, index) => {
                      return (
                        <div
                          // onClick={() =>
                          //   navigate(
                          //     `/property-type/developer/${item._id}?name=${item.developerName}`
                          //   )
                          // }
                          className="cursor-pointer flex-col p-5 lg:h-[252px] sm:w-[180px] h-[172px]  lg:w-[264px] rounded-[15px] flex justify-center items-center border"
                          key={item._id}
                        >
                          <Lazyloading
                            src={`${MAIN_IMAG_URL}/${item?.mainImgaeLink}`}
                            alt={item?.developerName}
                            className={"my-10 object-contain max-h-[120px]"}
                          />
                             <div className="text-center my-3 flex justify-evenly">
                <a
                  className="cursor-pointer text-xs  hover:underline font-medium"
                  onClick={() =>
                    navigate(`/admin/edit-developer/${item._id}`, {
                      state: item,
                    })
                  }
                >
                  Edit
                </a>
                <a
                  onClick={() => {
                    const status = confirm('Are you want to delete!')
                    if(status){
                      handleDelete(item._id)
                    }
                  }}
                  className="text-red-400 cursor-pointer ms-4 text-xs  hover:underline font-medium"
                >
                  Delete
                </a>
              </div>
                        </div>
                      );
                    })}
                </section>
              </div>
              </>
  )
}

export default ViewDevelopersPage