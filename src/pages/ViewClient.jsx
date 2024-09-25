import { useEffect, useState } from "react";
import { errorToast } from "../toast";
import { Navigate, useNavigate } from "react-router-dom";
import { MAIN_IMAG_URL, deleteClientLogo, getClientLogos } from "../api";

function ViewClient() {
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, [refresh]);

  const fetchdata = async () => {
    try {
      const response = await getClientLogos();
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
      await deleteClientLogo(id);
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
          <h1 className="sf-medium  font-medium text-5xl">Views</h1>
        </div>
        {
          <div className="flex gap-3 flex-wrap justify-center items-center">
            {data.map((item) => {
              return (
                <div className="" key={item._id}>
                  <img
                    className="w-[300px] h-[150px] my-3 lg:my-0 object-contain"
                    src={`${MAIN_IMAG_URL}/${item.mainImgaeLink}`}
                    key={item._id}
                    alt="loading"
                    loading="lazy"
                  />
                  <a
                    onClick={() =>
                      navigate(`/admin/edit-client/${item._id}`, {
                        state: item,
                      })
                    }
                    className=" me-4 cursor-pointer text-xs  hover:underline font-medium"
                  >
                    Edit
                  </a>
                  <a
                    onClick={() => {
                      const status = confirm("Are you want to delete!");
                      if (status) {
                        handleDelete(item._id);
                      }
                    }}
                    className="cursor-pointer text-xs  hover:underline font-medium"
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

export default ViewClient;
