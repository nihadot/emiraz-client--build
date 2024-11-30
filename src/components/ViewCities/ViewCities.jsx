import React, { useEffect, useState } from 'react'
import { changeImagePathCity, handleCityRenameImageNamesAPI } from '../../api';
import { errorToast } from '../../toast';
import {  deleteCityById, fetchAllCitiesAPI, fetchAllPriorityCitiesAPI } from '../../services/city';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchedCities } from '../../features/citiesSlice';
import CityListingCard from '../CityListingCard/CityListingCard';
import SearchComponent from '../AdminViewProjects/SearchComponent';
import ChooseOption from '../AdminViewProjects/ChooseOption';

function ViewCities() {


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
        citiesArray: [],
    });

    useEffect(() => {
        fetchdata();
    }, [navigate]);

    useEffect(() => {
        setData([...state.prioritiesArray, ...state.citiesArray]);
        setSearchData([...state.prioritiesArray, ...state.citiesArray]);
        dispatch(fetchedCities([...state.prioritiesArray, ...state.citiesArray]));
    }, [state.citiesArray, state.prioritiesArray]);


    const fetchdata = async () => {
        try {
            setLoadingState({ ...loadingState, loading: true });

            const responsePriorityCities = await fetchAllPriorityCitiesAPI();
            setState(prev => {
                if (prev) {
                    return { ...prev, prioritiesArray: responsePriorityCities.result }
                }
            });
            const responseAllCities = await fetchAllCitiesAPI();
            setState(prev => {
                if (prev) {
                    return { ...prev, citiesArray: responseAllCities.result }
                }
            });
        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
            setLoadingState({ ...loadingState, formSubmitting: false });
        }
    };

    const handleDelete = async ({ _id }) => {
        try {
            // console.log("Delete action triggered for ID:", _id);
        
            // Show confirmation dialog
            const status = confirm("Are you sure you want to delete?");
            // console.log("User confirmation:", status);
            if (!status) return;
        
            // API call to delete the city
            await deleteCityById(_id);
            // console.log("API call succeeded for ID:", _id);
    
            // Filter data to remove the deleted item
            const filteredData = data.filter((item) => item._id !== _id);
    
            // Update both data and searchData
            setData(filteredData);
            setSearchData(filteredData); // Ensure search data reflects the deletion
        } catch (error) {
            // console.error("Error during deletion:", error);
            errorToast(error?.response?.data?.message || error?.message || "An error occurred");
        }
    };

  const [searchTerm, setSearchTerm] = useState(''); // Track the search term



    const handleSearchItem = (searchQuery) => {
        setSearchTerm(searchQuery); // Update the search term
        const lowerCaseSearchTerm = searchQuery.toLowerCase();
    
        const filteredCities = data.filter((item) => {
          const searchFields = [
            item._id,
            item.name,
            item.emirateName,
          ];
    
          return searchFields.some(
            (field) => field && field.toLowerCase().includes(lowerCaseSearchTerm)
          );
        });
    
        setSearchData(filteredCities); // Update the search results state
      };


    return (
        <div className="min-h-screen">

        <div className="flex gap-2 items-center mb-3 ">

        <SearchComponent setSearchTerm={handleSearchItem} />
          {/* choose option for developers */}
        {/* <ChooseOption userSelectedValue={handleSearchDevelopers} options={allDevelopers} defaultValue='Choose Developer'/> */}
  
        {/* choose option for project type */}
        {/* <ChooseOption userSelectedValue={handleSearchProjectTypes} options={allProjectTypes} defaultValue='Choose Project Type'/> */}
  
        {/* choose option for cities */}
        {/* <ChooseOption userSelectedValue={handleSearchCities} options={allCities} defaultValue='Choose City'/> */}
  
  {/* toggle draft button */}
      {/* <ToggleButton toggleOnLabel='Draft' toggleOffLabel='Published' toggleStatus={handleToggleDraft}/> */}
  
      </div>
        <div className='grid grid-cols-5 gap-3'>
            {/* <button onClick={changeImagePath} className='bg-black text-white'>Change Images Path</button> */}
            {/* <button onClick={handleRenameImageNames} className='bg-black text-white'>Rename Images Names</button> */}
            {
                searchData?.length > 0 &&
                searchData?.map((item, index) => {
                    return <div className='flex flex-col w-full relative'>
                        <CityListingCard  values={item} key={index} />
                        <div className="mt-2 mb-2.5 flex gap-2">
                            <button
                                onClick={() =>
                                  navigate(`/admin/edit-city/${item._id}`, { state: item })
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

export default ViewCities