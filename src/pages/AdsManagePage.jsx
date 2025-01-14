import AdsManage from "../components/AdsManage";

function AdsManagePage() {
  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium font-medium text-5xl">Manage Ads</h1>
        </div>
        <div className=" h-[83vh] overflow-scroll">
          <AdsManage />
        </div>
      </div>
    </div>
  );
}

export default AdsManagePage;
