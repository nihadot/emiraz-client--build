import ViewNotification from "../components/ViewNotification"

function AdminViewNotification() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">View Notification</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <ViewNotification />
        </div>
      </div>
    </div>
  )
}

export default AdminViewNotification