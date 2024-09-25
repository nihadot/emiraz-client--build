import ViewAgency from "../components/Agency/ViewAgency"

function AdminViewAgencyPage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">View Agents</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
          <ViewAgency />
        </div>
      </div>
    </div>
  );
}

export default AdminViewAgencyPage;
