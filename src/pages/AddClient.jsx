import AddClientLogo from "../components/AddClientLogo"

function AddClient() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Add Client</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <AddClientLogo />
        </div>
      </div>
    </div>
  )
}

export default AddClient