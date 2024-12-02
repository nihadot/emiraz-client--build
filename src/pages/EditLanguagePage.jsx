import React from 'react'
import EditLanguage from "./EditLanguage"
function EditLanguagePage() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">Edit City</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <EditLanguage />
      </div>
    </div>
  </div>
  )
}

export default EditLanguagePage