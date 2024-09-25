import EditPropertyType from "../components/EditPropertyType.jsx"

function EditPropertyTypePage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Edit Property Types</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <EditPropertyType />
        </div>
      </div>
    </div>
  )
}

export default EditPropertyTypePage