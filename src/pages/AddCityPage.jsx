import AddCity from "../components/AddCityPage"

function AddCityPage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Add City</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <AddCity />
        </div>
      </div>
    </div>
  )
}

export default AddCityPage