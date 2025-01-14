import SearchAndFilter from "../components/SearchAndFilter"
import RecentEnquiries from '../components/RecentEnquiries'
import { useEffect, useState } from "react";
import DashboardPageAdmin from "./DashboardPageAdmin";
import DuplicateEnquiries from "../components/DuplicateEnquiries";

function AdminEnquiries() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilterDeveloper, setSelectedFilterDeveloper] = useState('');
  const [selectedFilterAgency, setSelectedFilterAgency] = useState('');
  const [toggleButtonState,setToggleButtonState] = useState(false);
  const toggleButton = ()=> setToggleButtonState(pre => !pre );

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Disable common screenshot shortcuts
      if (
        (e.key === 'PrintScreen') || 
        (e.key === 'F12') || 
        (e.metaKey && e.shiftKey && e.key === '3')  // Cmd + Shift + 3 on Mac
      ) {
        e.preventDefault();
        alert("Screenshot shortcut blocked!");
      }

    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='my-7'>

<div className="my-3">

    <DashboardPageAdmin/>
</div>

        <SearchAndFilter setSearchTerm={setSearchTerm} setSelectedFilterAgency={setSelectedFilterAgency} setSelectedFilterDeveloper={setSelectedFilterDeveloper} setSelectedFilter={setSelectedFilter} />
        <div className="w-full ">
        <div
    onClick={toggleButton}
    className='bg-black/70 rounded-[8px] flex px-4 items-center my-4 text-sm text-white w-full h-12 '
    >
        <label htmlFor="">{ !toggleButtonState ? 'Click here' : 'Click to back -: Go back TO Enquiries' }</label>
    </div>

      { toggleButtonState ?   <DuplicateEnquiries searchTerm={searchTerm} selectedFilterAgency={selectedFilterAgency} selectedFilterDeveloper={selectedFilterDeveloper} selectedFilter={selectedFilter}/> :

        <RecentEnquiries searchTerm={searchTerm} selectedFilterAgency={selectedFilterAgency} selectedFilterDeveloper={selectedFilterDeveloper} selectedFilter={selectedFilter} />}
        </div>
    </div>
  )
}

export default AdminEnquiries