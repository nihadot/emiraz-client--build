import ManageDevelopers from "../components/ManageDevelopers"

function ManageDevelopersPage() {
  return (
    <div>
        <div className="">
            <div className="flex justify-between my-6">
                <h1 className="sf-medium font-medium text-5xl">Manage Blog</h1>
            </div>
            <ManageDevelopers />
      </div>
    </div>
  )
}

export default ManageDevelopersPage