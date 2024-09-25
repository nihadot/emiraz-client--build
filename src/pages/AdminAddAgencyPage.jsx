import AddAgency from "../components/Agency/AddAgency"

function AdminAddAgencyPage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Add Agent</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
          <AddAgency />
        </div>
      </div>
    </div>
  );
}

export default AdminAddAgencyPage;
