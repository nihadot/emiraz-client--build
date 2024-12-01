import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import HomeIndex from "../../components/user/HomeIndex.jsx";
import Helmet from "react-helmet";
import Brands from "../../components/user/Brands.jsx";
import PropertiesCard from "../../components/user/PropertiesCard";
import {
  MAIN_IMAG_URL,
  SERVER_URL,
  getBanners,
  getBlogs,
  getCities,
  getProperties,
} from "../../api";
import { NavLink, useNavigate } from "react-router-dom";
import PropertyType from "../../components/user/PropertyType.jsx";
import { CloseSVG } from "../../assets/icons";
import UserBanner from "../../components/UserBanner.jsx";

import { SuccessLabel } from "../../assets/images/index.js";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./index.css";
// import required modules
import { Pagination } from "swiper/modules";
import Footer from "../../components/Footer.jsx";
import Lazyloading from "../../components/Lazyloading/Lazyloading.jsx";
import LogoLoader from "../../components/Loader/LogoLoader.jsx";
import Modal from "../../components/Register/Modal";

import bannerLogo from "../../assets/logo/ps_logo.png"
import DesktopHeader from "../../components/user/DesktopHeader.jsx";
import SearchSection from "./SearchSection.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import _ from "lodash";
import axios from "axios";

function UserHome() {
  const [properties, setProperties] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [blogs, setBlogs] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [propertyUniqueID, setPropertyUniqueID] = React.useState("");
  const [developerId, setDeveloperId] = React.useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successCLoseModal, setSuccessCLoseModal] = React.useState(false);
  const [projectCountOfListing, setProjectCountOfListing] = useState(9);
  const [propertiesBackup,setPropertiesBackup] = useState([]);
  React.useEffect(() => {
    fetchdata();

    updateProjectsCardNumbers();

    window.addEventListener("resize", updateProjectsCardNumbers);

    return () => {
      setSuccessCLoseModal(false);
      setDeveloperId("");
      setPropertyUniqueID("");
      setCities([]);
      setBlogs([]);
      setBanners([]);
      setProperties([]);
      setModal(false);
      window.removeEventListener("resize", updateProjectsCardNumbers);
    };
  }, []);

  const updateProjectsCardNumbers = () => {
    if (window.innerWidth <= 768) {
      setProjectCountOfListing(6);
    } else {
      setProjectCountOfListing(9);
    }
  };

  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await getProperties();
      setProperties(response.result);
      setPropertiesBackup(response.result);
      const banners = await getBanners();
      setBanners(banners.result);
      const cities = await getCities();
      setCities(cities.result);
      const blogs = await getBlogs();
      setBlogs(blogs.result);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleRegister = (id, deveId) => {
    setDeveloperId(deveId);
    setModal(true);
    setSuccessCLoseModal(false);
    setPropertyUniqueID(id);
  };

  const [searchQueryState,setSearchQueryState] = useState('');

  const handleSearchQuery = (value)=>{
    setSearchQueryState(value);
  }


  useEffect(()=>{
    if(searchQueryState){
      fetchSearchResults(searchQueryState);
    }

    if(searchQueryState === ''){
      setProperties(propertiesBackup);
    }
    
  },[searchQueryState])


  const fetchSearchResults = _.debounce(async(searchQuery)=>{
    try {
      const response = await axios.get(`${SERVER_URL}/property/search`,{
        params:{
          q:searchQuery
        }
      })
      const data = response.data.result;
     setProperties(data);
    } catch (error) {
      setProperties([]);
    }
  },300);

  const seo_description =
    "Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE";
  const seo_title =
    "Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE";
  const seo_site_url = `${window.location.href}`;

  return (
    <div className="">
    
        <>
          <Helmet>
            <title>
              {seo_title?.length > 65 ? seo_title?.slice(0, 65) : seo_title}
            </title>
            <meta
              name="description"
              content={
                seo_description?.length > 170
                  ? seo_description?.slice(0, 170)
                  : seo_description
              }
            />
            <meta name="author" content="Property Seller"></meta>
            <link rel="canonical" href={seo_site_url}></link>
            <meta property="og:title" content={seo_title} />
            <meta property="og:description" content={seo_description} />
            <meta property="og:image" content={seo_description} />
            <meta property="og:url" content={seo_site_url} />
            <meta property="og:type" content="website" />
          </Helmet>

          <HomeIndex>
            <DesktopHeader/>
            <div className=" flex justify-center items-center h-[87vh]">
             
              <img className="w-[80%] xl:w-[800px] h-[195px] object-contain" src={bannerLogo} alt="" />
             
            </div>
          </HomeIndex>

              {/* only mobile screen header */}
          <div className="w-full px-5 mt-4 flex sm:hidden">
                <Header/>
          </div>
              {/* only mobile screen header */}



          {/* search section */}
        <div className="mb-5">

          <SearchSection handleSearchQuery={handleSearchQuery} />
          <hr className="bg-[#E4E4E4] hidden sm:block" />
        </div>
        
          {/* search section */}

            {/* properties  */}
          <div className=" mx-5 flex flex-col justify-center items-center lg:mx-20 xl:mx-28 ">
            <div className="mt-5 w-full grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3  mb-5 gap-7 max-w-[1300px]">
              {properties &&
                properties.map((item, index) => {
                  if (index < projectCountOfListing) {
                    return (
                      <PropertiesCard
                        navigate={navigate}
                        handleRegister={handleRegister}
                        key={item?._id}
                        item={item}
                      />
                    );
                  }
                })}
            </div>
            {/* properties  */}

            {modal && (
              <Modal
                setDeveloperId={setDeveloperId}
                setModal={setModal}
                propertyUniqueID={propertyUniqueID}
                setSuccessCLoseModal={setSuccessCLoseModal}
                setPropertyUniqueID={setPropertyUniqueID}
                developerId={developerId}
              />
            )}

            {successCLoseModal && (
              <div
                className="w-full h-screen z-50 fixed top-0  flex justify-center items-center left-0"
                style={{ background: "rgba(0,0,0,0.9" }}
              >
                <div className=" relative rounded-[20px] py-7 max-w-[820px] w-[90%] lg:w-full   flex flex-col  bg-white px-[20px]  justify-center items-center ">
                  <Lazyloading
                    alt={"success label"}
                    src={SuccessLabel}
                    className={
                      "w-[76px] h-[76px] md:w-[109px] md:h-[109px] mt-10 object-cover cursor-pointer"
                    }
                  />
                  <p>
                    {/* <img onClick={closeRegister} src={CloseSVG} alt="loading" loading="lazy" className="w-6 h-6" />  */}
                    <div
                      className=""
                      onClick={() => setSuccessCLoseModal(false)}
                    >
                      <Lazyloading
                        className={
                          "w-6 h-6 cursor-pointer absolute right-8 top-6"
                        }
                        src={CloseSVG}
                        alt={"close"}
                      />
                    </div>
                  </p>
                  <h1 className="text-[20px] text-center lg:text-[30px] poppins-semibold mt-4 ">
                    Your Interest has Been Registered
                  </h1>
                  <h2 className="text-[16px] text-center lg:text-[18px]  poppins-medium mt-3">
                    Our team will contact you shortly
                  </h2>
                </div>
              </div>
            )}

            {properties.length === 0 && <p className="text-base text-black sf-medium my-10">Property not found</p>}

            <div className="pb-5 md:pb-4 sm:pt-5">
              <div className="m-auto text-[14px] poppins-semibold w-[106px] h-[50px] flex justify-center items-center rounded-[10px] bg-[#0D1117] text-white">
                <NavLink to={`/projects`}>
                  <h1>View All</h1>
                </NavLink>
              </div>
            </div>

            {/* property type */}
            <div className="hidden sm:block mt-0 md:my-10 w-full max-w-[1300px]">
              <PropertyType />
            </div>
            {/* property type */}

            {/* banner */}
            <div className="w-full max-w-[1300px] mb-4  mt-0 sm:mt-7">
              {banners &&
                banners.map((item) => {
                  return <UserBanner key={item._id} {...item} />;
                })}
            </div>
            {/* banner */}

            {/* cities */}
            <section className="hidden sm:block w-full max-w-[1300px]">
              <div className="sf-medium-600 flex items-center justify-between w-full">
                <h1 className="flex  flex-col leading-tight mb-3 ">
                  <span className="capitalize text-[20px] lg:text-[50px] text-[#666666]">
                    Explore city based
                  </span>{" "}
                  <span className="text-[40px] lg:text-[70px]">Projects</span>
                </h1>
                <button
                  onClick={() => navigate("/all-cities")}
                  className="hidden sm:block  text-[14px] w-[150px] h-[48px]  bg-black text-white rounded-[10px] poppins-semibold"
                >
                  View All Cities
                </button>
              </div>
              <div className="hidden  md:grid gap-3 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 max-w-[1300px]">
                {cities.map((item, index) => {
                  if (index < 10) {
                    return (
                      <div
                        onClick={() =>
                          navigate(`/cproperty/${item._id}/${item.cityName}`)
                        }
                        className="cursor-pointer border rounded-[10px]"
                        key={item._id}
                      >
                        <div className="relative rounded-[10px] overflow-hidden  h-[200px]">
                          <Lazyloading
                            src={item.imageFile?.secure_url}
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
                        <p className="py-4 capitalize px-6 text-[15px] poppins-medium">
                          {item?.propertyCount === 0
                            ? "Not available"
                            : item?.propertyCount === 1
                            ? `${item?.propertyCount} Project available`
                            : `${item?.propertyCount} Projects available`}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>

              {/* when open mobile */}

              <div className="rounded-[10px] overflow-hidden block sm:hidden w-full h-[300px]">
                <Swiper
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  className=""
                  style={{ width: "100%" }}
                >
                  {cities &&
                    cities.map((item) => {
                      return (
                        <SwiperSlide
                          onClick={() => {
                            navigate(`/cproperty/${item._id}/${item.cityName}`);
                          }}
                          key={item._id}
                          className="cursor-pointer"
                        >
                          <div className="h-[280px] rounded-[10px] bg-[#FAFAFA] border-[#D2D2D2] border">
                            <div
                              className="relative
                        "
                            >
                              <Lazyloading
                                                            src={item?.imageFile?.secure_url}

                                alt={item.cityName}
                                className="w-full h-[200px] rounded-[10px] object-cover"
                              />
                              <div className="bg-gradient-to-b from-black to-black absolute top-0 w-full h-full opacity-20 z-20"></div>
                            </div>
                            <p className="px-3 pt-4 capitalize">
                              {item?.propertyCount === 0
                                ? "Not available"
                                : item?.propertyCount === 1
                                ? `${item?.propertyCount} Project available`
                                : `${item?.propertyCount} Projects available`}
                            </p>
                            <div className="px-3 py-3 absolute top-0 w-full h-full z-30">
                              <span className="block text-white w-fit bg-[#666666] text-[10px] rounded-[40px] px-3 py-2">
                                {item.emirateName}
                              </span>
                              <p className="poppins-semibold text-[24px] text-white ">
                                {item.cityName}
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>

              <div className="mb-3 flex sm:hidden justify-center">
                <button
                  onClick={() => navigate("/all-cities")}
                  className="bg-black text-[14px] w-[150px] h-[48px]  poppins-semibold rounded-[10px] text-white"
                >
                  View All Cities
                </button>
              </div>

              {/*  */}
            </section>
            {/* cities */}

            {/* blogs */}
            <section className="max-w-[1440px] w-full mt-0 sm:mt-14 sm:mb-0">
              <div className=" sf-medium-600 flex items-center justify-between ">
                <h1 className="hidden sm:flex flex-col leading-tight ">
                  <span className=" text-[20px] lg:text-[50px] text-[#666666]">
                    Blogs:
                  </span>{" "}
                  <span className="capitalize text-[34px] lg:text-[70px]">
                    Read more, Learn More
                  </span>
                </h1>
                <h5 className="text-[45px] sf-bold mx-auto block sm:hidden text-center">Blogs</h5>
                <button
                  onClick={() => navigate(`/blog`)}
                  className="hidden sm:block  text-[14px] w-[150px] h-[48px]  bg-black text-white rounded-[10px] poppins-semibold"
                >
                  View All Blogs
                </button>
              </div>

              {/* mapping */}

              <div className="grid xl:grid-cols-3 mt-5  990px:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4  gap-5">
                {blogs &&
                  blogs.map((item, index) => {
                    if (index < 3) {
                      return (
                        <div
                          key={item._id}
                          className="border px-4 pt-4 py-0 rounded-[15px] h-fit"
                        >
                          <div
                            className="rounded-[10px] overflow-hidden h-[220px]"
                            key={item._id}
                          >
                            <Lazyloading
                              src={item?.imageFile?.secure_url}
                              className="w-full h-full object-cover"
                              alt={item.blogTitle}
                            />
                          </div>
                          <div className="poppins-medium text-2xl">
                            <h1 className="blog-title text-[25px] pt-4">
                              {item.blogTitle}
                            </h1>
                          </div>
                          <div className="blog-description break-words poppins-medium text-[15px] text-[#666666] text-left mt-3">
                            <p>{item.blogBody}</p>
                          </div>
                          <div className="my-4">
                            <button
                              type="button"
                              className="bg-white border border-[#000000] w-full py-2 rounded-[5px] text-[10px] poppins-semibold"
                              onClick={() =>
                                navigate(
                                  `/blog/${item._id}/${item.blogTitle
                                    .trim()
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}/`
                                )
                              }
                            >
                              Keep Reading
                            </button>
                          </div>
                        </div>
                      );
                    }
                  })}
                <div className="mt-2 mb-10 sm:mb-0 sm:mt-4 sm:mb-10 flex justify-center">
                  <button
                    onClick={() => navigate("/blog")}
                    className="text-[14px] block sm:hidden  w-[150px] h-[48px]  bg-black text-white rounded-[10px] poppins-semibold"
                  >
                    View All Blogs
                  </button>
                </div>
              </div>

              {/*  */}
            </section>

            {/* blogs */}

            {/* footer */}
          </div>

          <Footer />
        </>
    
    </div>
  );
}

export default UserHome;
