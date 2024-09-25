import AddNotification from "../components/AddNotification"

function AddNotificationPage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Add Notification</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <AddNotification />
        </div>
      </div>
    </div>
  )
}

export default AddNotificationPage