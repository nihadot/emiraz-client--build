import AdminEditProperties from "../components/AdminEditProperties"

function EditProperty() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Edit Property</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <AdminEditProperties />
        </div>
      </div>
    </div>
  )
}

export default EditProperty