import EditClientLogo from "../components/EditClientLogo"

function EditClient() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium  font-medium text-5xl">Edit Client</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <EditClientLogo />
      </div>
    </div>
  </div>
  )
}

export default EditClient