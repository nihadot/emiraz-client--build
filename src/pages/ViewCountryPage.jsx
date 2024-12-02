import React from 'react'
import ViewCountries from "./ViewCountries"
function ViewCountryPage() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">View Countries</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <ViewCountries />
      </div>
    </div>
  </div>
  )
}

export default ViewCountryPage