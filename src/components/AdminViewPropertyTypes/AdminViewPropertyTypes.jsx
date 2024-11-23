import React, { useEffect, useState } from 'react'
import { addPropertyTypesChangesAPI, deletePropertyType, fetchPropertyTypesAPI, resetPropertyTypesImagesAPI, resetPropertyTypesImagesNamesAPI } from '../../api';
import { errorToast } from '../../toast';
import Preview from '../AdminAddPropertyType/Preview';

function AdminViewPropertyTypes() {

    const [loadingState, setLoadingState] = useState({
        loading: false,
        message: '',
    });

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchdata();
    }, []);


    const fetchdata = async () => {
        try {
            setLoadingState({ ...loadingState, loading: true });

            const response = await fetchPropertyTypesAPI();
            setData(response.result);

        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
            setLoadingState({ ...loadingState, formSubmitting: false });
        }
    };

    const handleClickResetImage = async () => {
        try {
            await resetPropertyTypesImagesAPI();
            window.location.reload();
        } catch (error) {
            errorToast(error?.response?.data?.message || error?.message || 'An error occurred ')
        } finally {
            // Reset the loading state
        }
    }

    const handleClickRestImageName = async () => {
        try {
            await resetPropertyTypesImagesNamesAPI();
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

        return (
            <div className='grid grid-cols-4 gap-3'>
                <button onClick={handleClickResetImage} className='bg-black text-white'>Reset Images</button>
                <button onClick={handleClickRestImageName} className='bg-black text-white'>Reset Images Names</button>
                <button onClick={handleTheChanges} className='bg-black text-white'>Add new Field</button>
                {
                    data.length > 0 &&
                    data.map((item, index) => {
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

    export default AdminViewPropertyTypes