import SearchAndFilter from "../components/SearchAndFilter"
import RecentEnquiries from '../components/RecentEnquiries'
import { useState } from "react";
import DashboardPageAdmin from "./DashboardPageAdmin";

function AdminEnquiries() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedFilterDeveloper, setSelectedFilterDeveloper] = useState('');
  const [selectedFilterAgency, setSelectedFilterAgency] = useState('');

  return (
    <div className='my-7'>

<div className="my-3">

    <DashboardPageAdmin/>
</div>

        <SearchAndFilter setSearchTerm={setSearchTerm} setSelectedFilterAgency={setSelectedFilterAgency} setSelectedFilterDeveloper={setSelectedFilterDeveloper} setSelectedFilter={setSelectedFilter} />
        <div className="w-full overflow-scroll">

        <RecentEnquiries searchTerm={searchTerm} selectedFilterAgency={selectedFilterAgency} selectedFilterDeveloper={selectedFilterDeveloper} selectedFilter={selectedFilter} />
        </div>
    </div>
  )
}

export default AdminEnquiries