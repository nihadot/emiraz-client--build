import React, { useEffect } from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/Footer";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {  getPropertiesByProjectsId } from "../../api";
import PropertiesCard from "../../components/user/PropertiesCard";
import { CloseSVG } from "../../assets/icons";
import Lazyloading from "../../components/Lazyloading/Lazyloading";
import { SuccessLabel } from "../../assets/images";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";
import Modal from "../../components/Register/Modal";
import { useSelector } from "react-redux";


function UserAllProjects() {
  const [properties, setProperties] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(9); // Number of items to display per page
  const navigate = useNavigate();
  const { id: idOfPropertyType,name:nameOfPropertyType } = useParams();
  const [developerId, setDeveloperId] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [successCLoseModal, setSuccessCLoseModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [propertyUniqueID, setPropertyUniqueID] = React.useState("");

  const value = useSelector((item)=> item.search );

  // console.log(value,'value')

  useEffect(()=>{
    if(value?.result){
      setProperties(value.result.filter((item)=> item.propertyType.includes(nameOfPropertyType.toLowerCase())))
    }
  },[value?.result])

  React.useEffect(() => {
    setLoading(true);
      fetchData(nameOfPropertyType);

  }, [nameOfPropertyType]); // Fetch data only once when component mounts


  const fetchData = async (name) => {
    try {
      setLoading(true);
   
        const propertiesData = await getPropertiesByProjectsId(name);
        setProperties(propertiesData.result);
     
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };


  const handleRegister = (id, deveId) => {
    setDeveloperId(deveId);
    setModal(true);
    setSuccessCLoseModal(false);
    setPropertyUniqueID(id);
  };

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Calculate the starting index and ending index of items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, properties.length);

  const currentProperties = properties.slice(startIndex, endIndex);

  const seo_description =
    "Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE";
  const seo_title =
    "Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE";

  const seo_site_url = `${window.location.href}`;

  return (
    <>
    
        <>
          <div>
            <Helmet>
              <title>{seo_title}</title>
              <meta name="description" content={seo_description} />
              <meta property="og:title" content={seo_title} />
              <meta property="og:description" content={seo_description} />
              <meta property="og:image" content={seo_description} />
              <meta property="og:url" content={seo_site_url} />
              <meta property="og:type" content="website" />
              <link rel="canonical" href={seo_site_url}></link>
            </Helmet>

            <div className="mt-4 mx-6">
              <Header />
            </div>
            <h1 className="px-6 md:px-20 lg:px-28 text-center mt-4 sf-medium-600 text-[35px] uppercase sm:text-[70px]">
              {nameOfPropertyType}
            </h1>
            <section className="mb-10">
            <div className="  mx-6 flex flex-col justify-center items-center lg:mx-20 xl:mx-28 ">
            <div className="  mt-6 w-full grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3  mb-5 gap-7 max-w-[1300px]">
                  {currentProperties.map((item, index) => (
                    
                      <PropertiesCard
                      key={index}
                        navigate={navigate}
                        handleRegister={handleRegister}
                        item={item}
                      />
                  
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="mx-2 py-2 px-4 rounded bg-gray-300"
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`mx-2 py-2 px-4 rounded ${
                        currentPage === index + 1
                          ? "bg-black text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="mx-2 py-2 px-4 rounded bg-gray-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>

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
                    alt={"loading"}
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
                        alt={"loading"}
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
            <Footer />
          </div>
        </>
    
    </>
  );
}

export default UserAllProjects;
