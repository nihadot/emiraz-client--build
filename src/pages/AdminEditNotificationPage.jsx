import EditNotification from "../components/EditNotification"

function AdminEditNotificationPage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Edit Notification</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
            <EditNotification />
        </div>
      </div>
    </div>
  )
}

export default AdminEditNotificationPage