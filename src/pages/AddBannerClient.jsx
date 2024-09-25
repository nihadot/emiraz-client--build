
import AddBannerLogo from "../components/AddBannerLogo"

function AddBannerClient() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Add Premium Slot</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <AddBannerLogo />
        </div>
      </div>
    </div>
  )
}

export default AddBannerClient