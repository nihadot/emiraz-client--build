import { useEffect, useState } from 'react';
import { FaAngleDown, FaSearch } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa6';
import { getAgency, getDevelopers } from '../api';
import { errorToast } from '../toast';

function SearchAndFilter({
  setSearchTerm,
  setSelectedFilter,
  setSelectedFilterDeveloper,
  setSelectedFilterAgency,
}) {
  const [filterOptions, setFilterOptions] = useState(false);
  const [fileActiveName, setFileActiveName] = useState('Status');
  const [agencies, setAgencies] = useState([]);
  const [developersFilterOptionVisible, setDevelopersFilterOptionVisible] =
    useState(false);
  const [developersFilterOptionItem, setDevelopersFilterOptionItem] = useState(
    {}
  );

  const [agencyFilterOptionVisible, setAgencyFilterOptionVisible] =
    useState(false);
  const [agencyFilterOptionItem, setAgencyFilterOptionItem] = useState({});

  const [developers, setDevelopers] = useState([]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleFilterSelection = filter => {
    setSelectedFilter(filter);
    setFileActiveName(filter);
    setFilterOptions(false);
  };

  const handleFilterSelectionDevelopers = item => {
    setDevelopersFilterOptionVisible(false);
    setDevelopersFilterOptionItem(item);
    setSelectedFilterDeveloper(item);
  };

  const handleFilterSelectionAgency = item => {
    setAgencyFilterOptionVisible(false);
    setAgencyFilterOptionItem(item);
    setSelectedFilterAgency(item);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const [agenciesResponse, developersResponse] = await Promise.all([
        getAgency(),
        getDevelopers(),
      ]);

      setAgencies(agenciesResponse.result);
      setDevelopers(developersResponse.result);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast('An error occurred during login.');
      }
    }
  };

  return (
    <div className='flex justify-between flex-row relative mb-3'>
      <div className='flex max-w-[271px] w-[271px] h-[53px] max-h-[53px] font-extralight text-sm sf-normal text-[#666666] justify-center items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'>
        <input
          type='search'
          onChange={handleSearchChange}
          name=''
          className='bg-transparent outline-none pe-3'
          id=''
          placeholder='Search...'
        />
        <FaSearch color='#666666' />
      </div>
      <div className='flex gap-5'>
        <div
          onClick={() =>
            setAgencyFilterOptionVisible(!agencyFilterOptionVisible)
          }
          className=' relative cursor-pointer flex w-[188px] h-[53px] max-h-[53px] justify-between px-10 items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'
        >
          <span className='w-[#666666] text-black font-extralight text-sm sf-normal capitalize'>
            {agencyFilterOptionItem?.name
              ? agencyFilterOptionItem?.name
              : 'Agent'}
          </span>
          {agencyFilterOptionVisible ? <FaAngleUp /> : <FaAngleDown />}

          {agencyFilterOptionVisible && (
            <div className='bg-white text-start poppins-medium text-[14px] px-2 absolute z-50 right-0 top-16 border py-3 rounded-[10px] border-[#E4E4E4] max-w-48 max-h-80 h-fit overflow-y-auto w-48 ps-4'>
              <div
                className='py-2 capitalize cursor-pointer'
                onClick={() =>
                  handleFilterSelectionAgency({ name: 'All', _id: 'all' })
                }
              >
                All
              </div>

              {agencies &&
                agencies?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleFilterSelectionAgency(item)}
                      className='py-2 capitalize cursor-pointer'
                    >
                      {item.name}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div
          onClick={() =>
            setDevelopersFilterOptionVisible(!developersFilterOptionVisible)
          }
          className=' relative cursor-pointer flex w-[188px] h-[53px] max-h-[53px] justify-between px-10 items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'
        >
          <span className='w-[#666666] text-black font-extralight text-sm sf-normal capitalize'>
            {developersFilterOptionItem?.developerName
              ? developersFilterOptionItem?.developerName
              : 'Developer'}
          </span>
          {developersFilterOptionVisible ? <FaAngleUp /> : <FaAngleDown />}

          {developersFilterOptionVisible && (
            <div className='bg-white text-start poppins-medium text-[14px] px-2 absolute z-50 right-0 top-16 border py-3 rounded-[10px] border-[#E4E4E4] max-w-48 max-h-80 h-fit overflow-y-auto w-48 ps-4'>
              <div
                className='py-2 capitalize cursor-pointer'
                onClick={() =>
                  handleFilterSelectionDevelopers({
                    developerName: 'All',
                    _id: 'all',
                  })
                }
              >
                All
              </div>

              {developers &&
                developers?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => handleFilterSelectionDevelopers(item)}
                      className='py-2 capitalize cursor-pointer'
                    >
                      {item.developerName}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div
          onClick={() => setFilterOptions(!filterOptions)}
          className='cursor-pointer flex w-[188px] h-[53px] max-h-[53px] justify-between px-10 items-center border rounded-[50px] border-[#E4E4E4] bg-[#F7F7F7]'
        >
          <span className='w-[#666666] font-extralight text-sm sf-normal capitalize'>
            {fileActiveName === 'newlead'
              ? 'New leads'
              : fileActiveName === 'not-interested'
              ? 'Not Interested'
              : fileActiveName === 'in-progressive'
              ? 'In Progress'
              : fileActiveName === 'wrong-number'
              ? 'Wrong Number'
              : fileActiveName}
          </span>
          {filterOptions ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
      {filterOptions && (
        <div className='bg-white text-start poppins-medium text-[14px] px-2 absolute z-50 right-0 top-16 border py-3 rounded-[10px] border-[#E4E4E4] max-w-48 w-48 ps-4'>
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('all')}
          >
            All
          </p>
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('closed')}
          >
            closed
          </p>
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('not-interested')}
          >
            Not Interested
          </p>
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('qualified')}
          >
            qualified
          </p>
         
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('interested')}
          >
            interested
          </p>
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('in-progressive')}
          >
            In Progress
          </p>
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('newlead')}
          >
            New Lead
          </p>
          <p
            className='py-2 capitalize cursor-pointer'
            onClick={() => handleFilterSelection('wrong-number')}
          >
            Wrong Number
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchAndFilter;
