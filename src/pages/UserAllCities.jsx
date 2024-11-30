import React from "react";
import Header from "../components/user/Header";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { MAIN_IMAG_URL, getCities } from "../api";
import { useNavigate } from "react-router-dom";
import Lazyloading from "../components/Lazyloading/Lazyloading";
import { Helmet } from "react-helmet";

function UserAllCities() {
  const [cities, setCities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchdata();

    return () => {
      setCities([]);
    };
  }, []);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const cities = await getCities();
      setCities(cities.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const seo_description =
    "Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE | Cities pages";
  const seo_title =
    "Property seller cities | Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE";
  const seo_site_url = `${window.location.href}`;

  return (
    <div>
      <Helmet>
        <title>
          {seo_title?.length > 65 ? seo_title?.slice(0, 65) : seo_title}
        </title>
        <meta name="author" content="Property Seller"></meta>

        <meta name="description" content={seo_description} />
        <link rel="canonical" href={seo_site_url}></link>
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
        <meta property="og:image" content={seo_description} />
        <meta property="og:url" content={seo_site_url} />
        <meta property="og:type" content="website" />
      </Helmet>
    
        <>
          <div className="mt-4 px-6">
            <Header />
          </div>

          {/*  */}
          <section className="mt-[24px] px-6 w-full lg:px-28  xl:mx-auto mb-10">
            <div className="hidden md:grid gap-3 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 max-w-[1300px]">
              {cities.map((item) => {
                return (
                  <div
                    onClick={() =>
                          navigate(`/cproperty/${item._id}/${item.cityName}`)
                        }
                    className=" cursor-pointer mb-3 md:mb-0 border rounded-[10px]"
                    key={item._id}
                  >
                    <div className="relative rounded-[10px] overflow-hidden  h-[200px]">
                      <Lazyloading
                        src={item?.imageFile?.secure_url}
                        alt={item.cityName}
                        className="w-full h-full object-cover"
                      />
                      <div className="bg-gradient-to-b from-black to-black absolute top-0 w-full h-full opacity-20 z-20"></div>
                      <div className="px-3 py-3 absolute top-0 w-full h-full z-30">
                        <span className="block text-white w-fit bg-[#666666] text-[10px] rounded-[40px] px-3 py-2">
                          {item.emirateName}
                        </span>
                        <p className="poppins-semibold text-[24px] text-white ">
                          {item.cityName}
                        </p>
                      </div>
                    </div>
                    <p className="py-4 px-6 text-[15px] poppins-medium capitalize">
                      {" "}
                      { item?.propertyCount === 0 ? 'Not available' : item?.propertyCount === 1 ? `${item?.propertyCount} Project available`: `${item?.propertyCount} Projects available`}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* for mobile */}
            <div className="grid grid-cols-2 md:hidden gap-3 max-w-[1300px]">
              {cities.map((item) => {
                return (
                  <div
                    onClick={() => {
                      navigate(`/cproperty/${item._id}/${item.cityName}`)
                      
                    }}
                    className="mb-3 cursor-pointer md:mb-0 border rounded-[10px]"
                    key={item._id}
                  >
                    <div className="relative rounded-[10px] overflow-hidden  h-[200px]">
                      <Lazyloading
                       src={item?.imageFile?.secure_url}
                        alt={item.cityName}
                        className="w-full h-full object-cover"
                      />
                      <div className="bg-gradient-to-b from-black to-black absolute top-0 w-full h-full opacity-20 z-20"></div>
                      <div className="px-3 py-3 absolute top-0 w-full h-full z-30">
                        <span className="block text-white w-fit bg-[#666666] text-[8px] rounded-[40px] px-3 py-2">
                          {item.emirateName}
                        </span>
                        <p className="poppins-semibold text-[22px] text-white ">
                          {item.cityName}
                        </p>
                      </div>
                    </div>
                    <p className="py-4 capitalize px-6 text-[15px] poppins-medium">
                    { item?.propertyCount === 0 ? 'Not available' : item?.propertyCount === 1 ? `${item?.propertyCount} Project available`: `${item?.propertyCount} Projects available`}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* for mobile */}
          </section>
          {/*  */}

          <Footer />
        </>
   
    </div>
  );
}

export default UserAllCities;
