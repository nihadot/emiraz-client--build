import { useEffect, useState } from 'react';
import City from "../components/City";
import { getCities } from '../api';
import { errorToast } from '../toast';
import { FaSearch } from 'react-icons/fa';

function EditCitiesPage() {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  useEffect(() => {
    // Filter and sort properties when data or searchKeyWord changes
    filterAndSortProperties();
  }, [data, searchKeyWord]);

  const fetchData = async () => {
    try {
      const response = await getCities();
      setData(response.result);
    } catch (error) {
      errorToast(error?.response?.data?.message || error?.message || 'Error occurred');
    }
  };

  const filterAndSortProperties = () => {
    const lowerCaseSearchTerm = searchKeyWord.toLowerCase();
    const filteredData = data.filter((item) => {
      const searchFields = [
        // item._id?.toString(), // Convert _id to string
        item.emirateName?.toLowerCase(),
        item.cityName?.toLowerCase(),
        item.priority?.toString(), // Convert priority to string
      ];

      return searchFields.some(
        (field) => field && field.includes(lowerCaseSearchTerm)
      );
    });

    // Update state with filtered properties
    setFilteredProperties(filteredData);
  };

  return (
    <div>
      <div className="h-fit">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Cities</h1>
        </div>
        <SearchAndFilter setSearchTerm={setSearchKeyWord} />
        <div className="grid grid-cols-5 overflow-scroll">
          {filteredProperties.map((item) => (
            <City refresh={refresh} setRefresh={setRefresh} key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditCitiesPage;

function SearchAndFilter({ setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-between flex-row relative mb-3">
      <div className="flex max-w-[271px] w-[271px] h-[53px] max-h-[53px] font-extralight text-sm sf-normal text-[#666666] justify-center items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]">
        <input
          type="search"
          onChange={handleSearchChange}
          className="bg-transparent outline-none pe-3"
          placeholder="Search..."
        />
        <FaSearch color="#666666" />
      </div>
    </div>
  );
}
