import AddBanner from "../components/AddBanner.jsx"

function AddBannerPage() {
  return (
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium font-medium text-5xl">Add Banner</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <AddBanner />
      </div>
    </div>
  )
}

export default AddBannerPage