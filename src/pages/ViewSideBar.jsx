import { useEffect, useState } from "react";
import { MAIN_IMAG_URL, deleteBannerLogo, deleteSideBanners, fetchSideBanners, getBannerLogos } from "../api";
import { errorToast } from "../toast";
import { useNavigate } from "react-router-dom";

function ViewSideBar() {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const fetchdata = async () => {
    try {
      const response = await fetchSideBanners();
      setData(response.result);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast("An error occurred during login.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!id) return errorToast("Id Is Not Provided!");

    try {
      await deleteSideBanners(id);
      setRefresh(!refresh);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
      } else {
        errorToast("An error occurred during login.");
      }
    }
  };

  return (
    <div>
      <div className="">
        <div className="sticky top-0 bg-white flex justify-between py-6">
          <h1 className="sf-medium  font-medium text-5xl">VIews</h1>
        </div>
        {
          <div className="flex gap-3 flex-wrap justify-center items-center">
            {data.map((item) => {
              return (
                <div className="" key={item._id}>
                  <img
                    className="w-[338px] h-[670px] my-3 lg:my-0"
                    src={`${MAIN_IMAG_URL}/${item.mainImgaeLink}`}
                    key={item._id}
                    alt="loading"
                    loading="lazy"
                  />

                  <p className="my-2 text-sm"> {item.name} </p>
                 
                  <a
                    onClick={() => {
                      const status = confirm("Are you want to delete!");
                      if (status) {
                        handleDelete(item._id);
                      }
                    }}
                    className="text-red-500 cursor-pointer text-xs  hover:underline font-medium"
                  >
                    Delete
                  </a>
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
}

export default ViewSideBar;
