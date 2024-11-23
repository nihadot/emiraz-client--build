import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorToast } from '../../toast';
import { fetchedProperties } from '../../features/propertiesSlice';
import { deleteProjectById, fetchAllPriorityProjectsAPI, fetchAllProjectsAPI } from '../../services/project';
import PropertyListingCard from '../PropertyListingCard/PropertyListingCard';
import SearchComponent from './SearchComponent';
import ChooseOption from './ChooseOption';
import { fetchBothTypeDevelopersAPI } from '../../services/developer';
import { fetchBothTypeCitiesAPI } from '../../services/city';
import ToggleButton from './ToggleButton';

function AdminViewProjects() {
  const navigate = useNavigate();
  const [loadingState, setLoadingState] = useState({
    loading: false,
    message: '',
  });

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]); // Store search results separately
  const [searchTerm, setSearchTerm] = useState(''); // Track the search term
  const [allDevelopers, setAllDevelopers] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [state, setState] = useState({
    prioritiesArray: [],
    projectsArray: [],
  });

  useEffect(() => {
    fetchData();
  }, [navigate]);

  useEffect(() => {
    const combinedData = [...state.prioritiesArray, ...state.projectsArray];
    const filteredData = combinedData.filter((item)=> item.isDraft === false)
    setData(combinedData);
    setSearchData(filteredData); // Initially, show all data
    dispatch(fetchedProperties(combinedData));
  }, [state.projectsArray, state.prioritiesArray]);

  const fetchData = async () => {
    try {
      setLoadingState({ ...loadingState, loading: true });

      const responseProjects = await fetchAllPriorityProjectsAPI();
      setState((prev) => {
        return { ...prev, prioritiesArray: responseProjects.result };
      });

      const responseAllProjects = await fetchAllProjectsAPI();
      setState((prev) => {
        return { ...prev, projectsArray: responseAllProjects.result };
      });

      const response_developer = await fetchBothTypeDevelopersAPI();
      setAllDevelopers(response_developer.result);


      const response_cities = await fetchBothTypeCitiesAPI();
      setAllCities(response_cities.result);

    } catch (error) {
      errorToast(
        error?.response?.data?.message || error?.message || 'An error occurred'
      );
    } finally {
      setLoadingState({ ...loadingState, loading: false });
    }
  };

  const handleDelete = async ({ _id }) => {
    try {
      const status = confirm('Are you sure you want to delete?');
      if (!status) return;
      const result = data.filter((item) => item._id !== _id);
      setData(result);
      setSearchData(result); // Update search results after deletion
      await deleteProjectById(_id);
    } catch (error) {
      errorToast(
        error?.response?.data?.message || error?.message || 'An error occurred'
      );
    }
  };

  const handleSearchItem = (searchQuery) => {
    setSearchTerm(searchQuery); // Update the search term
    const lowerCaseSearchTerm = searchQuery.toLowerCase();

    const filteredProperties = data.filter((item) => {
      const searchFields = [
        item._id,
        item.name,
        item.priceInAED,
        item.priceInUSD,
        item.priceInINR,
        item.bedrooms,
        item.handoverDate,
        item.address,
        item.description,
        item.projectNumber,
      ];

      return searchFields.some(
        (field) => field && field.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });

    setSearchData(filteredProperties); // Update the search results state
  };

  const handleSearchDevelopers = (searchQuery) => {

    if(searchQuery?.name?.toLowerCase() === 'none'){
      setSearchData(data);
      return;
    }

    const filteredProjects = data.filter((item) => {
      // Check if the developer _id matches the searchQuery _id
      return item?.developer === searchQuery?._id; 
    });
  
    setSearchData(filteredProjects); // Set the search data with filtered results
  };

  const handleSearchProjectTypes = (searchQuery) => {

    if(searchQuery?.name?.toLowerCase() === 'none'){
      setSearchData(data);
      return;
    }
    const filteredProjects = data.filter((item) => {
      // Check if the developer _id matches the searchQuery _id

      return item?.projectTypes?.includes(searchQuery?._id)
    });
    setSearchData(filteredProjects); // Set the search data with filtered results
  };

  const handleSearchCities =  (searchQuery) => {
    if(searchQuery?.name?.toLowerCase() === 'none'){
        setSearchData(data);
        return;
      }
      const filteredProjects = data.filter((item) => {
        // Check if the developer _id matches the searchQuery _id
  
        return item?.projectCities?.includes(searchQuery?._id+'')
      });
      setSearchData(filteredProjects); // Set the search data with filtered results
  }

  const allProjectTypes = [
    { name: 'villa', _id: 'villa' },
    { name: 'apartment', _id: 'apartment' },
    { name: 'penthouse', _id: 'penthouse' },
    { name: 'townhouse', _id: 'townhouse' },

  ]

  const handleToggleDraft = (status)   =>{

    console.log(status,'updatedData')

    if(status){
        const updatedData = data.filter((item) => item.isDraft === true  )        
        console.log(updatedData,'updatedData')
    setSearchData(updatedData);

    }else{
        const updatedData = data.filter((item) => item.isDraft === false  )        
        setSearchData(updatedData);
    }


  }
  
  return (
    <div className=' min-h-screen'>
    <div className="flex gap-2 items-center mb-3 ">

      <SearchComponent setSearchTerm={handleSearchItem} />
        {/* choose option for developers */}
      <ChooseOption userSelectedValue={handleSearchDevelopers} options={allDevelopers} defaultValue='Choose Developer'/>

      {/* choose option for project type */}
      <ChooseOption userSelectedValue={handleSearchProjectTypes} options={allProjectTypes} defaultValue='Choose Project Type'/>

      {/* choose option for cities */}
      <ChooseOption userSelectedValue={handleSearchCities} options={allCities} defaultValue='Choose City'/>

{/* toggle draft button */}
    <ToggleButton toggleOnLabel='Draft' toggleOffLabel='Published' toggleStatus={handleToggleDraft}/>

    </div>
      <div className='grid grid-cols-3 gap-3'>
        {searchData.length > 0 &&
          searchData.map((item, index) => {
            return (
              <div className='flex flex-col w-full relative' key={index}>
                <PropertyListingCard
                  navigate={navigate}
                  handleDelete={handleDelete}
                  modify
                  item={item}
                />
                <div className='mt-2 mb-2.5 flex gap-2'></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default AdminViewProjects;
