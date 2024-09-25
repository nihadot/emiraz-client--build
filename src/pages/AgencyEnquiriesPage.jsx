
import { useState } from "react";
import SearchAndFilter from "../components/Agency/SearchAndFilter";
import RecentEnquiries from "../components/Agency/RecentEnquiries";

function AgencyEnquiriesPage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilterDeveloper, setSelectedFilterDeveloper] = useState('');
  const [selectedFilterAgency, setSelectedFilterAgency] = useState('');

  return (
    <div className='my-7'>
        <SearchAndFilter setSearchTerm={setSearchTerm} setSelectedFilterAgency={setSelectedFilterAgency} setSelectedFilterDeveloper={setSelectedFilterDeveloper} setSelectedFilter={setSelectedFilter} />
        <div className="w-full overflow-scroll">

        <RecentEnquiries searchTerm={searchTerm} selectedFilterAgency={selectedFilterAgency} selectedFilterDeveloper={selectedFilterDeveloper} selectedFilter={selectedFilter} />
        </div>
    </div>
  )
}

export default AgencyEnquiriesPage