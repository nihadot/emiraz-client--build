import Enquiries from "../components/Enquiries";
import RecentEnquiries from "../components/RecentEnquiries";

function AdminDashBoard() {
  return (
    <div className="w-full">
      <div className="">
        {/* <Enquiries /> */}
      </div>
      <div className="h-11">
        <div className="flex justify-between my-6">
          <h1 className="sf-medium font-medium text-5xl">Recent Enquiries</h1>
        </div>
        <RecentEnquiries />
      </div>
    </div>
  );
}

export default AdminDashBoard;
