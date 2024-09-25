import ManageAgencies from "../components/ManageAgencies"

function AdminAgencyPage() {
  return (
    <div>
        <div className="">
            <div className="flex justify-between my-6">
                <h1 className="sf-medium font-medium text-5xl">Manage Properties</h1>
            </div>
            <ManageAgencies />
      </div>
    </div>
  )
}

export default AdminAgencyPage