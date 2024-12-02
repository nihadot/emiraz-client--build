import React from 'react'
import AddCountry from "./AddCountry"
function AddCountryPage() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">Add Country</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <AddCountry/>
      </div>
    </div>
  </div>
  )
}

export default AddCountryPage