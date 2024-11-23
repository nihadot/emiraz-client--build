import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { fetchedCities } from '../../features/citiesSlice';
import { fetchedDevelopers } from '../../features/developerSlice';
import { errorToast, successToast } from '../../toast';
import { deleteDeveloperById, fetchAllDevelopersAPI, fetchAllPriorityDevelopersAPI } from '../../services/developer';
import DeveloperListingCard from '../DeveloperListingCard/DeveloperListingCard';
import SearchComponent from '../AdminViewProjects/SearchComponent';

function ViewDevelopers() {


    const navigate = useNavigate();
    const [loadingState, setLoadingState] = useState({
        loading: false,
        message: '',
    });
    const [searchData, setSearchData] = useState([]); // Store search results separately

    const dispatch = useDispatch()
    const [data, setData] = useState([]);

    const [state, setState] = useState({
        prioritiesArray: [],
        developersArray: [],
    });

    useEffect(() => {
        fetchdata();
    }, [navigate]);

    useEffect(() => {
        setData([...state.prioritiesArray, ...state.developersArray]);
        setSearchData([...state.prioritiesArray, ...state.developersArray]);
        dispatch(fetchedDevelopers([...state.prioritiesArray, ...state.developersArray]));
    }, [state.developersArray, state.prioritiesArray]);


    const fetchdata = async () => {
        try {
            setLoadingState({ ...loadingState, loading: true });
            const responsePriorityDevelopers = await fetchAllPriorityDevelopersAPI();
            setState(prev => {
                if (prev) {
                    return { ...prev, prioritiesArray: responsePriorityDevelopers.result }
                }
            });
            const responseAllDevelopers = await fetchAllDevelopersAPI();
            setState(prev => {
                if (prev) {
                    return { ...prev, developersArray: responseAllDevelopers.result }
                }
            });
        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
            setLoadingState({ ...loadingState, formSubmitting: false });
        }
    };

    const changeImagePath = async () => {
        try {
            await changeImagePathCity();
            window.location.reload();
        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
        }
    }

    const handleRenameImageNames = async () => {
        try {
            await handleCityRenameImageNamesAPI();
            window.location.reload();

        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
        }
    }

    const handleDelete = async ({ _id }) => {
        try {
            const status = confirm("Are you want to delete!");
            if (!status) return true;
            await deleteDeveloperById(_id);
            successToast('Successfully Deleted')
            const result = data.length > 0 && data.filter((item, index) => item._id !== _id)
            setData(result);
        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        }
    }


    const handleSearchItem = (searchQuery) => {
        const lowerCaseSearchTerm = searchQuery.toLowerCase();
    
        const filteredProperties = data.filter((item) => {
          const searchFields = [
            item._id,
            item.name,
            item.password,
            item.username,
          ];
    
          return searchFields.some(
            (field) => field && field.toLowerCase().includes(lowerCaseSearchTerm)
          );
        });
    
        setSearchData(filteredProperties); // Update the search results state
      };


  return (
    <div className="min-h-screen">

    <div className="flex gap-2 items-center mb-3 ">

    <SearchComponent setSearchTerm={handleSearchItem} />
 
  </div>
    <div className='grid grid-cols-4 gap-3'>
            {/* <button onClick={changeImagePath} className='bg-black text-white'>Change Images Path</button> */}
            {/* <button onClick={handleRenameImageNames} className='bg-black text-white'>Rename Images Names</button> */}
            {
                searchData?.length > 0 &&
                searchData?.map((item, index) => {
                    return <div className='flex flex-col w-full relative'>
                        <DeveloperListingCard  values={item} key={index} />
                        <div className="mt-2 mb-2.5 flex gap-2">
                            <button
                                onClick={() =>
                                  navigate(`/admin/edit-developer/${item._id}`, { state: item })
                                }
                                className="flex-1 py-2.5 rounded font-semibold border border-[#000] text-[10px] bg-whire text-[#000000]"
                            >
                                Edit
                            </button>
                            <button
                                className={`flex-1 py-2.5 rounded font-semibold text-[10px] bg-[#000000] text-[#ffffff]`}
                                onClick={() => handleDelete(item)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                })
            }
        </div>
    </div>

  )
}

export default ViewDevelopers