import React from "react";
import { getBanners } from "../api/index.js";
import UserBanner from "../components/UserBanner.jsx";
import E from "../components/EditBanners.jsx";

function EditBannersPage() {

  const [banners, setBanners] = React.useState([]);
  const [refresh,setRefresh] = React.useState(true);


  React.useEffect(() => {
    fetchdata();
  }, [refresh]);

  const fetchdata = async () => {
    try {
      const banners = await getBanners()
      setBanners(banners.result)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1300px] my-8 mt-20">
          { banners && banners.map((item)=>{
            return <UserBanner refresh={refresh} setRefresh={setRefresh} role={'admin'} item={item} key={item._id} {...item} />
          })}
        </div>
        
    </>
  );
}

export default EditBannersPage;
