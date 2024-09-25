import EditBanner from "../components/EditBanner.jsx"

function EditBannerPage() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">Edit Banner</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <EditBanner />
      </div>
    </div>
  </div>
  )
}

export default EditBannerPage