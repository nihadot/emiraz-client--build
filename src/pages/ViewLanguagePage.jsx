import React from 'react'
import ViewLanguage from "./ViewLanguage"
function ViewLanguagePage() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">View Language</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <ViewLanguage />
      </div>
    </div>
  </div>
  )
}

export default ViewLanguagePage