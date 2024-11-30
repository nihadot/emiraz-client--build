import Header from "../../components/user/Header";
import Footer from "../../components/Footer";

import { OurSellerSVG } from "../../assets/images";
import React from "react";
import { MAIN_IMAG_URL, getDevelopers } from "../../api";
import { errorToast } from "../../toast";
import Lazyloading from "../../components/Lazyloading/Lazyloading";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";
function OurSellers() {
  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await getDevelopers();
      setData(response.result);

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        errorToast(error.response.data.message);
        setLoading(false);
      } else {
        errorToast("An error occurred during login.");
        setLoading(false);
      }
    }
  };

  const seo_description = "Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE";
const seo_title = `Our Developers`;
const seo_site_url = `${window.location.href}`;


  return (
    <>
    
        <>



  <Helmet>
  <meta name="author" content="Property Seller"></meta>

        <title>{seo_title}</title>
        <meta name="description" content={seo_description} />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
        <meta property="og:image" content={seo_description} />
        <meta property="og:url" content={seo_site_url} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={seo_site_url}></link>
      </Helmet>
          <div className="w-full">
            <div className="mt-4 px-6">
              <Header />
            </div>
            <section className=" w-full px-6 m-auto mt-8 mb-10 ">
              <section className="relative  main-sellers  m-auto rounded-[10px] overflow-hidden mt-4 h-[170px] ">
                <Lazyloading
                  src={OurSellerSVG}
                  className="w-full h-full object-cover"
                  alt={'our developers'}
                />
                <div className="flex w-full justify-center  items-center h-full absolute top-0 left-0 ">
                  <h1 className=" text-white sf-medium-600 text-[45px] lg:text-[70px] ">
                    Developers
                  </h1>
                </div>
              </section>
              <div className="mx-0 my-4 lg:my-14 items-center md:mx-20 lg:mx-28 ">
                <section className=" sm:flex gap-3 md:gap-5 grid grid-cols-2 sm:justify-center sm:items-center sm:flex-wrap  ">
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                      return (
                        <div
                          onClick={() =>
                            navigate(
                              `/developers/${item._id}/${item.developerName}`
                            )
                          }
                          className="cursor-pointer overflow-hidden p-5 lg:h-[252px] sm:w-[180px] h-[172px]  lg:w-[264px] rounded-[15px] flex justify-center flex-col items-center border"
                          key={item._id}
                        >
                          <Lazyloading
                            src={item?.imageFile?.secure_url}
                            alt={item?.developerName}
                            className={"my-10  object-contain max-h-[120px]"}
                          />

                                                     <label htmlFor="">{item?.developerName}</label>
                        </div>
                      );
                    })}
                </section>
              </div>
            </section>
            <Footer />
          </div>
        </>
   
    </>
  );
}

export default OurSellers;
