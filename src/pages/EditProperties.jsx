import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import { deleteProperties, getProperties, SERVER_URL } from "../api";
import { errorToast } from "../toast";
import SearchSection from "./SearchSection";
import axios from "axios";
import { ADMIN_TOKEN } from "../api/localstorage-varibles";

function EditProperties() {
  const [data, setData] = useState([]); // Data to be displayed (local + remote)
  const [page, setPage] = useState(1); // Track page number for API calls
  const [loading, setLoading] = useState(false); // Handle loading state for the "Load More" button
  const [hasMore, setHasMore] = useState(true); // To check if there's more data to load
  const [refresh, setRefresh] = useState(true); // For refreshing the data

  const itemsPerPage = 20; // Fetch 20 records per "Load More" click

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilterDeveloper, setSelectedFilterDeveloper] = useState({ _id: 'all', developerName: 'All' });
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);


  // console.log(selectedFilterDeveloper,'selectedFilterDeveloper')
  // Debounce search term for optimization
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timer); // Clean up the timeout on every change
  }, [searchTerm]);

  // Fetch initial data when component mounts
  useEffect(() => {
    fetchInitialData();
  }, [refresh]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const response = await getProperties({ page: 1, limit: 100 }); // Fetch first 100 records
      setData(response?.result || []);
      // setHasMore(response?.result.length === 100); // If we got 100, assume more data is available
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Error occurred while fetching properties"
      );
    }
  };

  // Function to load more data
  const loadMoreData = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1; // Increment the page number
      const response = await getProperties({ page: nextPage, limit: itemsPerPage });
      setData((prevData) => [...prevData, ...response?.result]); // Append new data to the existing data
      setPage(nextPage); // Update current page number
      setHasMore(response?.result.length === itemsPerPage); // If the length is 20, we assume more data exists
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Error occurred while loading more properties"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProperties(id);
      setRefresh(!refresh);
    } catch (error) {
      errorToast(
        error?.response?.data?.message || error?.message || "Error occurred!"
      );
    }
  };

  // Filtering data based on search term and selected developer
  const filteredData = data.filter(item => {
    const searchMatch =
      item.projectTitle.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

    const developerMatch = selectedFilterDeveloper._id === 'all' || item.developer === selectedFilterDeveloper._id;

    // console.log(developerMatch,'developerMatch')
    return searchMatch && developerMatch;
  });

  const handlePublish = async(id)=>{

    const response = await axios.put(`${SERVER_URL}/property/update/to-publish/${id}`,{}, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });

    try {
      setRefresh(!refresh);
    } catch (error) {
      errorToast(
        error?.response?.data?.message || error?.message || "Error occurred!"
      );
    }
  }

  return (
    <div className="">
      <div className="sticky z-50 top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">View Projects</h1>
      </div>

      {/* Search Section */}
      <SearchSection 
      setData={setData}
        setSearchTerm={setSearchTerm}
        setSelectedFilterDeveloper={setSelectedFilterDeveloper}
      />

      {/* Cards Display */}
      <div className="grid h-fit grid-cols-3 gap-2 flex-wrap">
        {filteredData?.map((item) => (
          <Cards
          publish
            view
            handleDelete={handleDelete}
            refresh={refresh}
            setRefresh={setRefresh}
            key={item._id}
            item={item}
            handlePublish={handlePublish}
          />
        ))}
      </div>

      {/* Load More Button */}
      {/* {hasMore && !loading && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMoreData}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )} */}

      {/* Loading Spinner */}
      {/* {loading && (
        <div className="flex justify-center mt-6">
          <span>Loading...</span>
        </div>
      )} */}


      
    </div>
  );
}

export default EditProperties;
