import React from 'react'
import AddLanguage from "./AddLanguage"

function AddLanguagePage() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">Add City</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <AddLanguage />
      </div>
    </div>
  </div>
  )
}

export default AddLanguagePage