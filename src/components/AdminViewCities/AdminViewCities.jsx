import React, { useEffect, useState } from 'react'
import {  changeImagePathCity, fetchAllCitiesAPI, fetchAllPriorityCitiesAPI, handleCityRenameImageNamesAPI } from '../../api';
import { errorToast } from '../../toast';
import Preview from '../CityListingCard/Preview';

function AdminViewCities() {


    const [loadingState, setLoadingState] = useState({
        loading: false,
        message: '',
    });

    const [state,setState] = useState({
        prioritiesArray:[],
        citiesArray:[],
        data:[],
    });


    useEffect(() => {
        fetchdata();
    }, []);


    const fetchdata = async () => {
        try {
            setLoadingState({ ...loadingState, loading: true });

            const responsePriorityCities = await fetchAllPriorityCitiesAPI();
            setState(prev=> {
                if(prev){
                    return {...prev,prioritiesArray:responsePriorityCities.result}
                }
            } );
            // setState({...AdminViewCities,prioritiesArray:responsePriorityCities.result});
            const responseAllCities =await fetchAllCitiesAPI();
            // setState({citiesArray:responseAllCities.result});
            setState(prev=> {
                if(prev){
                    return {...prev,citiesArray:responseAllCities.result}
                }
            } );
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


    const handleTheChanges = async () => {
        try {
            await addPropertyTypesChangesAPI();
            window.location.reload();
        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
        }
    }

    const handleDelete = async(id) => {
        try {
        const status = confirm("Are you want to delete!");
        if (!status) return true; 
           const result = data.length > 0 && data.filter((item,index)=> item._id !== id )
           setData(result);
               await deletePropertyType(id);
        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
        }
    }

    console.log([state.prioritiesArray],'---')

  return (
    <div className='grid grid-cols-5 gap-3'>
                <button onClick={changeImagePath} className='bg-black text-white'>Change Images Path</button>
                <button onClick={handleRenameImageNames} className='bg-black text-white'>Rename Images Names</button>
                {
                    [...state.prioritiesArray,...state.citiesArray]?.length > 0 &&
                    [...state.prioritiesArray,...state.citiesArray]?.map((item, index) => {
                        return <div className='flex flex-col w-full'>
                            <Preview values={item} key={index} />
                            <div className="mt-2 mb-2.5 flex gap-2">
                                <button
                                    // onClick={() =>
                                    //   navigate(`/admin/edit-property/${item._id}`, { state: item })
                                    // }
                                    className="flex-1 py-2.5 rounded font-semibold border border-[#000] text-[10px] bg-whire text-[#000000]"
                                >
                                    Edit
                                </button>
                                <button
                                    className={`flex-1 py-2.5 rounded font-semibold text-[10px] bg-[#000000] text-[#ffffff]`}
                                    onClick={() => handleDelete(item._id) }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
  
  )
}

export default AdminViewCities