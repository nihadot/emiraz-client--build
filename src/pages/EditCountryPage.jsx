import React from 'react'
import EditCountry from "./EditCountry"
function EditCountryPage() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">Edit Country</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <EditCountry />
      </div>
    </div>
  </div>
  )
}

export default EditCountryPage