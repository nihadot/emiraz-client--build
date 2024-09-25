
import EditBannerLogo from "../components/EditBannerLogo"

function EditBannerClient() {
  return (
    <div>
    <div className="">
      <div className="sticky top-0 bg-white flex justify-between py-6">
        <h1 className="sf-medium  font-medium text-5xl">Edit Developer</h1>
      </div>
      <div className=" h-[83vh] overflow-scroll">
          <EditBannerLogo />
      </div>
    </div>
  </div>
  )
}

export default EditBannerClient