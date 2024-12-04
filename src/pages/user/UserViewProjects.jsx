import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/user/Header';
import Footer from '../../components/Footer';
import { BedIcon, SuccessLabel, TypeIcon } from '../../assets/images';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MAIN_IMAG_URL,
  SERVER_URL,
  SMALL_IMAG_URL,
  addingEnquiry,
  fetchSideBanners,
  getProperties,
  getPropertyById,
  getPropertyByName,
} from '../../api';
import Placeholder from '../../assets/placeholder/placeholder-image.png';
import {
  CameraSVGIcons,
  CloseSVG,
  LocationSVGIcons,
  BgBlackCLoseIcon,
  LeftSVGBlackIcon,
  RightSVGBlackIcon,
  LeftSVGWhite,
  RightSVGWhite,
} from '../../assets/icons';
import PropertiesCard from '../../components/user/PropertiesCard';
import { errorToast } from '../../toast';
import Lazyloading from '../../components/Lazyloading/Lazyloading';
import Loader from '../../components/Loader/Loader';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay } from 'swiper/modules';
import { Helmet } from 'react-helmet';
import { capitalizeWords } from '../../utils';
import { PiShareFatThin } from 'react-icons/pi';

import PhoneInput from 'react-phone-input-2';
import Modal from '../../components/Register/Modal';
import axios from 'axios';

function UserViewProjects() {
  const [properties, setProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [readmore, setReadMore] = React.useState(false);
  const [index, setIndex] = useState(0);
  const [toggleImagePoppup, setImageTogglePoppup] = useState(false);
  const [property, setProperty] = React.useState({});
  const [sidebanner, setSideBanner] = React.useState([]);
  const { id,name } = useParams();
  const navigate = useNavigate(); 
  const [indexOf, setIndexOf] = useState(0);
  const [formIsLoading, setFormIsLoading] = React.useState(false);

  const [orientation, setOrientation] = useState(
    window.innerWidth > window.innerHeight ? "Landscape" : "Portrait"
  );

  const checkOrientation = () => {
    setOrientation(
      window.innerWidth > window.innerHeight ? "Landscape" : "Portrait"
    );
  };


  useEffect(() => {
    // Add event listener for screen resize
    window.addEventListener("resize", checkOrientation);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);


  React.useEffect(() => {
    setLoading(true);
    if (!name) {
      return navigate('/');
    }

  
    fetchdata();
    // fetchAds();

    window.scrollTo(0, 0);
  }, [navigate]);

const [ads,setAds] = useState([]);

  // const fetchAds = async()=>{
  //   try {
  //     const response = await axios.get(`${SERVER_URL}/sidebar`);
  // //   const response = await getCities();
  //   setAds(response.data.result);
  // } catch (error) {
  //   errorToast(error?.response?.data?.message || error?.message || 'Error occurred');
  // }
  // }

  const handleShare = (title, url) => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Hello, I found this off-plan project on PropertySeller',
          url: `https://propertyseller.ae/${url}`,
        })
        .then(() => console.log('Thanks for sharing!'))
        .catch(console.error);
    }
  };

  const [youtubePopupView, setYoutubePopupView] = useState(false);
  const [adsState, setAdsState] = useState([]);
  // const [indexOfAdsState, setIndexOfAdsState] = useState(0);
  const [mapPopupView, setMapPopupView] = useState(false);

  const handleMap = () => {
    setMapPopupView(!mapPopupView);
  };
  const handleYoutubeVideo = () => setYoutubePopupView(!youtubePopupView);

  const handleToggleImagePoppup = () => {
    setImageTogglePoppup(!toggleImagePoppup);
  };

  const nextIndexOfMianImage = () => {
    if (fullImages.length > indexOf + 1) {
      setIndexOf(indexOf + 1);
    }
  };
  const previosIndexOfMianImage = () => {
    if (indexOf > 0) {
      setIndexOf(indexOf - 1);
    }
  };

  const [fullImages,setFullImages] = useState([]);

  const fetchdata = async () => {
    try {
      const property = await getPropertyByName(name);
    
      // if (
        // property.result &&
        // property.result.length > 0 &&
        // property.result[0].mainImgaeLink

        const images = []

        if(property?.result[0]?.imageFile){
          images.push(property.result[0].imageFile);
        }

        if(property?.result[0].imageFiles){
          images.push(...property.result[0].imageFiles);
        }

 
      // ) {
        // const propertiesNewArray = { ...property.result[0] };
        // propertiesNewArray.smallImage.unshift(propertiesNewArray.mainImgaeLink);
        setProperty(property.result[0]);
   
        setFullImages(images);


        const allProperties = await getProperties();
        setProperties(allProperties.result);
      // } else {
        // setProperty(property.result[0]);
      // }
      const sideBanner = await fetchSideBanners();

      // setSideBanner(sideBanner.result);
      setLoading(false);

      const sideBarResultFiltered =
        sideBanner.result &&
        sideBanner.result.filter(
          item => item._id+'' !== property.result[0].adsOptions+''
        );


      // Function to shuffle the array
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Shuffle the array
      const shuffledArray = shuffleArray(sideBarResultFiltered);

      setAdsState(shuffledArray);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (index === 0) {
      setIndex(0);
    } else {
      setIndex(index - 1);
    }
  };
  const handleNext = () => {
    if (fullImages.length - 1 === index) {
      setIndex(fullImages.length - 1);
    } else {
      setIndex(index + 1);
    }
  };

  const [modal, setModal] = React.useState(false);
  const [developerId, setDeveloperId] = React.useState('');
  const [successCLoseModal, setSuccessCLoseModal] = React.useState(false);

  // ----------------------------------------
  const [secondRegisterNumber, setSecondRegisterNumber] = React.useState('');
  const [thirdRegisterNumber, setThirdRegisterNumber] = React.useState('');
  const [secondRegisterName, setSecondRegisterName] = React.useState('');
  const [thirdRegisterName, setThirdRegisterName] = React.useState('');
  // ----------------------------------------

  const secondRegisterNumberRef = useRef(null);

  const [propertyUniqueID, setPropertyUniqueID] = React.useState('');

  const handleRegister = (id, deveId) => {
    setDeveloperId(deveId);
    setModal(true);
    setSuccessCLoseModal(false);
    setPropertyUniqueID(id);
  };

  // const videoRef = useRef();
  // const [isHidden, setIsHidden] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (videoRef.current && !isHidden) {
  //       const videoPosition = videoRef.current.getBoundingClientRect().top;
  //       const triggerPosition = window.innerHeight * 0.25; // Adjust trigger threshold as needed

  //       if (videoPosition < triggerPosition) {
  //         setIsHidden(true); // Hide the video once
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isHidden]);

  const handleSecondRegisterSubmit = async e => {
    try {
      e.preventDefault();
      if (!secondRegisterName) return errorToast('Name is required');
      if (secondRegisterName.length < 3)
        return errorToast('Minimum three chracters mustbe entered');
      if (!secondRegisterNumber) return errorToast('Mobile number is required');
      if (secondRegisterNumber.length > 20)
        return errorToast('Mobile number is no morethan 20');
      if (secondRegisterNumber.length < 10)
        return errorToast('10 digits required');
      setFormIsLoading(true);
      let data = {
        name: secondRegisterName,
        number: secondRegisterNumber,
        developerId: property.developerRef,
        propertyId: property._id,
      };

      await addingEnquiry(data);

      setSecondRegisterName('');
      setSecondRegisterNumber('');
      // secondRegisterNumberRef.current.value = '';
      setModal(false);    
        setSuccessCLoseModal(true);
      setFormIsLoading(false);
    } catch (error) {
      setFormIsLoading(false);
    }
  };

  const handleThirdRegisterSubmit = async e => {
    try {
      e.preventDefault();
      if (!thirdRegisterName) return errorToast('Name is required');
      if (thirdRegisterName.length < 3)
        return errorToast('Minimum three chracters mustbe entered');
      if (!thirdRegisterNumber) return errorToast('Mobile number is required');
      if (thirdRegisterNumber.length > 20)
        return errorToast('Mobile number is no morethan 20');
      if (thirdRegisterNumber.length < 10)
        return errorToast('10 digits required');
      setFormIsLoading(true);

      let data = {
        name: thirdRegisterName,
        number: thirdRegisterNumber,
        developerId: property.developerRef,
        propertyId: property._id,
      };

      await addingEnquiry(data);

      setThirdRegisterName('');
      setThirdRegisterNumber('');
      // thirdRegisterNumberRef.current.value = "";
      setModal(false);
      setSuccessCLoseModal(true);
      setFormIsLoading(false);
    } catch (error) {
      console.log(error);
      setFormIsLoading(false);
    }
  };

  const propertyTypesResult = property?.propertyType?.map((i, index) => {
    return (
      <p key={index}>
        {i} {property?.propertyType?.length > index + 1 && ","}
      </p>
    );
  }) ;
 

  const result = property?.propertyType?.map((i, index) => {
    return (
      <span key={index}>
        {i.name} {property.propertyType?.length > index + 1 && ','}
      </span>
    );
  });

  // const [fullImages,setFullImages] = useState([]);

  // useEffect(()=>{
  //  console.log(property,'property')
  // },[property])


  const seo_description = property?.projectMetaDescription;
  const seo_title = property?.projectMetaTitle;
  const seo_site_url = `${window.location.href}`;
  const keyboard = property?.projectMetaKeywords;


  const formattedDate = property?.handoverDate
  ? new Date(property.handoverDate).toISOString().split('T')[0] // Extract YYYY-MM-DD
  : 'N/A';

  return (
    <>
      <Helmet>
        <title>
          {seo_title?.length > 65 ? seo_title?.slice(0, 65) : seo_title}
        </title>
        <meta
          name='description'
          content={
            seo_description?.length > 170
              ? seo_description?.slice(0, 170)
              : seo_description
          }
        />
          <meta name="keywords" content={keyboard}/>
          <meta name="author" content="Property Seller"></meta>

        <meta property='og:title' content={seo_title} />
        <link rel='canonical' href={seo_site_url}></link>
        <meta property='og:description' content={seo_description} />
        <meta property='og:image' content={seo_description} />
        <meta property='og:url' content={seo_site_url} />
        <meta property='og:type' content='website' />
      </Helmet>

     
        <>
          <div className='relative'>
            <div className='pt-4 px-6'>
              <Header />
            </div>

            <>
              <section className='mt-[24px]  w-full px-6  md:px-20 lg:px-28'>
                {/* image banner */}
                <div className='w-full h-full justify-start items-stretch flex gap-3'>
                  {/* left side */}
                  <div className='  flex-[60%] rounded-[20px]'>
                    <div className=' h-[318px] sm:h-[514px] full relative w-ful'>
                      <div className='w-full h-full' onClick={handleToggleImagePoppup}>
                        <Lazyloading
                          src={
                            // fullImages.length > 0 ? (fullImages.length - 1) === index && fullImages[index-1]?.secure_url : fullImages[index]?.secure_url
                            // Placeholder
                            // index > fullImages.length ? fullImages[fullImages.length - 1]?.secure_url :  fullImages[index]?.secure_url
                            fullImages.length > 0 && fullImages[index]?.secure_url || Placeholder
                          }
                          alt='loading'
                          className='object-cover w-full h-full rounded-[20px]'
                        />
                        {/* {console.log(index > fullImages.length,fullImages[fullImages.length - 1],'index')} */}
                      </div>

                      {/* bg image overlap top section */}
                      <div className=' flex justify-between ' >
                          {/*  */}
                          <div className=' flex absolute w-full md:hidden justify-between  z-30 px-4 top-4 left-0 '>
                            <div className=''>
                              <div className='  flex items-center w-[170px]  bg-[#000000] text-[#ffffff]  h-[20px] justify-center gap-3  rounded-[3px] '>
                                <p className='uppercase poppins  font-semibold text-[10px]'>
                                HandOver Date : {formattedDate}
                                </p>
                              </div>
                              {property?.isChecked && (
                                <div className=' mt-1 flex items-center w-[170px]  bg-[#fff] text-[#000]  h-[20px] justify-center gap-3  rounded-[3px] '>
                                  <p className='uppercase poppins font-semibold text-[10px]'>
                                    Post Handover Payment Plan
                                  </p>
                                </div>
                              )}
                            </div>
                            <div
                              onClick={() =>
                                handleShare(
                                  property.projectTitle,
                                  `property/${property.projectTitle
                                    .trim()
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}/${property._id}`
                                )
                              }
                              className='bg-[#ffffff] cursor-pointer rounded-md w-8 h-8 flex  justify-center items-center'
                            >
                              <PiShareFatThin />
                            </div>
                          </div>

                          {/* desktop */}
                          <div className='hidden absolute w-full md:flex justify-between  z-30 px-4 top-4 left-0 '>
                            <div className=''>
                              <div className='  flex items-center w-[170px]  bg-[#000000] text-[#ffffff]  h-[20px] justify-center gap-3  rounded-[3px] '>
                                <p className='uppercase poppins font-semibold text-[10px]'>
                                  HandOver Date : {formattedDate}
                                </p>
                              </div>
                              {property?.isChecked && (
                                <div className=' mt-1 flex items-center w-[170px]  bg-[#fff] text-[#000]  h-[20px] justify-center gap-3  rounded-[3px] '>
                                  <p className='uppercase poppins font-semibold text-[10px]'>
                                    Post Handover Payment Plan
                                  </p>
                                </div>
                              )}
                            </div>
                            <div
                              onClick={() =>
                                handleShare(
                                  property.projectTitle,
                                  `property/${property.projectTitle
                                    .trim()
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}/${property._id}`
                                )
                              }
                              className='bg-[#ffffff] cursor-pointer rounded-md w-8 h-8 flex  justify-center items-center'
                            >
                              <PiShareFatThin />
                            </div>
                          </div>
                          {/* desktop */}
                        </div>
                      {/* bg image overlap top section */}



                      {/* left and right image slide arrow */}
                      <div className='flex absolute top-[36%] md:top-[39%] w-full justify-between mt-10 px-4'>
                          <div
                            className='bg-white text-black rounded-full py-[8px] md:py-[12px] px-[10px] md:px-[14px] cursor-pointer active:opacity-75 '
                            onClick={handlePrevious}
                          >
                            <Lazyloading
                              src={LeftSVGBlackIcon}
                              alt={'left'}
                              className={''}
                            />
                          </div>
                          <div
                            className='bg-white text-black rounded-full py-[8px] md:py-[12px] px-[10px] md:px-[14px] cursor-pointer active:opacity-75 '
                            onClick={handleNext}
                          >
                            <Lazyloading
                              src={RightSVGBlackIcon}
                              alt={'right'}
                              className={''}
                            />
                          </div>
                        </div>
                        {/* left and right image slide arrow */}


                              {/* bottom section of the image and map overlap   (desktop) */}
                        <div className='hidden absolute bottom-4 left-4 poppins poppins-semibold gap-2  md:flex items-center lg:justify-start justify-center '>
                          <div
                            onClick={handleToggleImagePoppup}
                            className='hidden md:flex lg:w-[150px] lg:flex-none cursor-pointer flex-1 justify-center items-center rounded-[5px] gap-2 bg-black px-6  py-2.5 text-white'
                          >
                            <Lazyloading
                              className='w-[16px] h-[14px]'
                              src={CameraSVGIcons}
                            />
                            <p className=' text-[8px]'>
                              Show {fullImages.length} Photos
                            </p>
                          </div>
                          <div
                            onClick={handleMap}
                            className='hidden md:flex cursor-pointer lg:w-[150px] lg:flex-none justify-center items-center rounded-md gap-2 flex-1 bg-black px-6  py-2.5 text-white'
                          >
                            <Lazyloading
                              className='w-[11px] h-[15px]'
                              src={LocationSVGIcons}
                            />
                            <p className=' text-[8px] lg:text-[10px]'>
                              View On Map
                            </p>
                          </div>
                          {/* desktop */}
                        </div>
                              {/* bottom section of the image and map overlap */}


                              {/* bottom section of the image and map overlap   (mobile) */}

                              <div className='md:hidden poppins poppins-se absolute bottom-4 left-4  mibold gap-2 flex items-center justify-start '>
                          
                          
                          <div
                            onClick={handleToggleImagePoppup}
                            className='flex md:hidden w-[32px] h-[32px]  cursor-pointer justify-center items-center rounded-[5px] gap-2 bg-black text-white'
                          >
                            <Lazyloading
                              className='w-[16px] h-[14px]'
                              src={CameraSVGIcons}
                            />
                          </div>
                          <div
                            onClick={handleMap}
                            className='flex md:hidden cursor-pointer w-[32px] h-[32px] justify-center items-center  rounded-md gap-2 bg-black text-white'
                          >
                            <Lazyloading
                              className='w-[11px] h-[15px]'
                              src={LocationSVGIcons}
                            />
                          </div>
                          {/* mobile */}
                        </div>
                              {/* bottom section of the image and map overlap   (mobile) */}

                    
                    </div>

                    {/* ---mobile view ( images and videos ) -- */}
                    <div className='md:hidden flex gap-3 my-4 justify-center items-center '>
                      <Lazyloading
                        // src={
                        //   property?.smallImage
                        //     ? property?.smallImage.length === index + 1
                        //       ? `${MAIN_IMAG_URL}/${property?.smallImage[0]}`
                        //       : `${SMALL_IMAG_URL}/${
                        //           property?.smallImage[index + 1]
                        //         }`
                        //     : Placeholder
                        // }


                        src={ fullImages.length - 1 === index ?  fullImages[fullImages.length - 1]?.secure_url || Placeholder :  fullImages[index+1]?.secure_url || Placeholder}
                        alt='loading'
                        className=' h-[82px]  object-cover  w-[82px] rounded-[10px]'
                      />

                      <Lazyloading
                        // src={
                        //   property?.smallImage?.length > 2
                        //     ? index + 2 >= property?.smallImage?.length
                        //       ? Placeholder
                        //       : `${SMALL_IMAG_URL}/${
                        //           property?.smallImage[index + 2]
                        //         }`
                        //     : Placeholder
                        // }
                        // 
                        src={ fullImages.length - 1 === index ?  fullImages[fullImages.length - 1]?.secure_url || Placeholder :  fullImages[index+2]?.secure_url || Placeholder}
                     

                        alt='loading'
                        className=' h-[82px] object-cover  w-[82px] rounded-[10px]'
                      />

                      <div
                        onClick={handleYoutubeVideo}
                        className='h-[82px]  object-cover   w-[82px]'
                      >
                        <iframe
                          style={{ pointerEvents: 'none' }}
                          className=' flex h-[82px]  object-cover   w-[82px] rounded-[10px]'
                          src={property.projectVideo}
                        ></iframe>
                      </div>
                    </div>

                    {/* ----- */}

                    {/*  */}
                    <div className='h-fit gap-3 poppins-medium mt-3 md:mt-0 mb-0 flex justify-start'>
                      <div className='  flex-[60%] '>
                        {/* property headline */}
                        <h1 className='text-[30px]  390px:leading-[46px] leading-[43px] lg:leading-[58px] capitalize h-fit lg:text-[40px] lg:me-3 md:mt-5 390px:font-medium font-semibold '>
                          {property?.projectTitle}
                        </h1>
                        {/* property headline */}

                        {/* starting price */}
                        <h2 className='text-[20px] mt-1 lg:mt-3 lg:text-[30px] poppins-medium'>
                          Starting From {''}
                          <span className=' font-bold text-[24px] poppins-semibold 390px:text-[30px] lg:text-[30px] 390px:font-bold '>
                            {property.price}
                          </span>
                        </h2>
                        {/* starting price */}

                        <div className='flex  justify-around lg:justify-start lg:gap-20 mt-5 '>
                          <div className='flex justify-center  items-center flex-col lg:flex-row gap-4'>
                            <Lazyloading
                              src={BedIcon}
                              className='w-[23px] h-[15px] '
                              alt='loading'
                            />
                            <span className='font-medium text-[10px] lg:text-[15px]'>
                              Bedrooms : {property.beds}
                            </span>
                          </div>
                          <div className='flex justify-center items-center flex-col lg:flex-row gap-4'>
                            <Lazyloading
                              src={TypeIcon}
                              className='w-[19px] h-[15px] '
                              alt='loading'
                            />
                            <span className='capitalize font-medium flex gap-2 text-[10px] lg:text-[15px]'>
                              <span>Type :</span>
                              <span className='flex gap-1'> {propertyTypesResult}</span>
                            </span>
                          </div>
                        </div>

                        <hr className='mt-3  mx-4 lg:mt-4 max-w-[740px] lg:mx-0' />
                      </div>
                    </div>
                    {/*  */}

                    {/*  */}
                    <div className='h-fit  poppins-medium max-w-[740px]'>
                      <h1 className='sf-medium text-[25px] lg:text-[30px] my-3'>
                        Location
                      </h1>

                      {/* map */}
                      <div className=' flex gap-7 items-center'>
                        <div className='' onClick={handleMap}>
                          <iframe
                            style={{ pointerEvents: 'none' }}
                            src={property.mapLink}
                            className='border-none w-[120px] h-[120px] rounded-full'
                            allowFullScreen=''
                            referrerPolicy='no-referrer-when-downgrade'
                          ></iframe>
                        </div>
                        <div className='text-[#545454] capitalize'>
                          <h1 className='text-black text-[16px] sf-medium'>
                            Address
                          </h1>
                          <p className='text-[12px] sf-medium'>
                            {property.address}
                          </p>
                         
                        </div>
                      </div>
                      <hr className='mt-8  lg:mt-4 max-w-[740px] lg:mx-0' />
                      {/* map */}
                    </div>
                    {/*  */}

                    {/* description */}
                    <div className='max-w-[740px] poppins-medium '>
                      <p className='text-[16px] sf-bold mt-4 '>
                        Project No: {property?.projectNumber}
                      </p>
                      <h1 className='sf-medium lg:text-[30px] text-[25px] my-3 text-black'>
                        Description
                      </h1>

                      <p className='flex sf-medium whitespace-pre-wrap gap-7 text-[#545454] text-[16px] items-center'>
                        {property?.description && readmore
                          ? property?.description
                          : property?.description?.slice(0, 500)}
                      </p>

                      <button
                        className='border my-3 border-black py-2 px-2 rounded-[5px] capitalize '
                        onClick={() => setReadMore(!readmore)}
                      >
                        {readmore ? 'Read less' : 'Read more'}
                      </button>
                    </div>
                    <hr className='mt-6 mb-4 max-w-[740px]' />

                    {/* {isVisibleVideoScreenIs && (
                      <iframe
                        className="mt-3 mb-6 block md:hidden h-[200px] object-cover   w-[100%] rounded-[10px]"
                        src={property.projectVideo}
                        frameBorder="0"
                      ></iframe>
                    )} */}
                    {/* description */}

                    {/* facilities and amentites */}
                    <div className='max-w-[740px] poppins-medium capitalize'>
                      <h1 className='sf-medium text-black lg:text-[30px] text-[25px] mt-3 my-2'>
                        Facilities and Amenities
                      </h1>
                      <div className='grid  grid-cols-1 md:grid-cols-3 '>
                        {property.facilities &&
                          property.facilities.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className='flex capitalize my-1 text-[14px] lg:text-[16px] gap-2 md:gap-3  items-baseline'
                              >
                                <span className='capitalize w-[8px] h-[8px]  rounded-full bg-[#545454] flex'></span>{' '}
                                {capitalizeWords(item)}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    {/* facilities and amentites */}

                    <hr className='mt-6 mb-4 max-w-[740px]' />

                    {/* areas nearby */}
                    <div className='poppins-medium max-w-[740px] '>
                      <h1 className='lg:text-[30px] sf-medium text-[25px] text-black mt-3 my-2'>
                        Areas and Things Nearby
                      </h1>
                      <div className='grid grid-cols-2 md:grid-cols-3 '>
                        {property.nearbyAreas &&
                          property.nearbyAreas.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className='flex items-baseline capitalize my-1 text-[14px] lg:text-[16px] gap-2'
                              >
                                <span className='capitalize w-[8px] h-[8px]  rounded-full bg-[#545454] flex'></span>{' '}
                                {capitalizeWords(item)}
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    {/* areas nearby */}

                    <hr className='mt-3 mb-4 max-w-[740px]' />

                    {/* payment plan */}
                    <div className=' poppins-medium max-w-[740px] capitalize'>
                      <h1 className=' lg:text-[30px] sf-medium text-[25px] mt-3 my-2 text-black'>
                        Payment Plan
                      </h1>
                      <div className='grid  grid-cols-1 md:grid-cols-2 md:gap-3'>
                        {property?.paymentOptions?.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className='mb-1 px-3 capitalize flex rounded-[10px] flex-col justify-center items-center text-white bg-black'
                            >
                              <p className='capitalize py-4 tlgtext-[16px]'>
                                {item}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* payment plan */}

                    {/* enquiry form */}
                    {/* under Payment Plan */}
                    <div className='pt-4 pb-0 max-w-[740px] '>
                      <form onSubmit={handleSecondRegisterSubmit} className=''>
                        <h1 className='sf-medium lg:text-[30px] text-[25px] mt-3 my-2 text-black'>
                          Register Your interest
                        </h1>
                        <input
                          type='text'
                          placeholder='Name'
                          disabled={formIsLoading}
                          value={secondRegisterName}
                          required
                          // autoFocus={true}
                          onChange={e => setSecondRegisterName(e.target.value)}
                          className='w-full poppins font-normal mb-1.5 rounded-[10px] ps-4 outline-none py-4 text-[12px] border border-[#E4E4E4]'
                        />
                        <PhoneInput
                        countryCodeEditable={false}
                          country={'ae'}
                          placeholder='Phone'
                          disabled={formIsLoading}
                          inputProps={{
                            require: true,
                            name: 'Phone',
                          }}
                          value={secondRegisterNumber}
                          buttonClass='!border-none !bg-transparent'
                          inputClass='!outline-none  !border-none !w-full'
                          containerClass='!outline-none !w-[100%] !py-[8px] !px-[10px] !appearance-none !border !border-[#E4E4E4] !text-xs !poppins !rounded-[10px]'
                          onChange={phone => setSecondRegisterNumber(phone)}
                        />

                        <input
                          type='submit'
                          value={formIsLoading ? 'Submiting...' : 'Submit'}
                          disabled={formIsLoading}
                          className='outline-none cursor-pointer w-[100%] py-4 px-5  appearance-none border bg-black text-white mt-2 text-xs poppins rounded-[10px]'
                        />
                      </form>
                    </div>
                    {/* enquiry form */}

                    <hr className='mt-6 mb-0 max-w-[740px]' />
                  </div>
                  {/* left side */}

                  {/* right side */}
                  <div className='hidden 1030px:block flex-[30%] relative  rounded-[20px]'>
                    <Lazyloading
                      // src={
                      //   property?.smallImage
                      //     ? property?.smallImage.length === index + 1
                      //       ? `${MAIN_IMAG_URL}/${property?.smallImage[0]}`
                      //       : `${SMALL_IMAG_URL}/${
                      //           property?.smallImage[index + 1]
                      //         }`
                      //     : Placeholder
                      // }


                      src={
                         fullImages.length -1 === index ?  fullImages[fullImages.length - 1]?.secure_url : fullImages[index+1]?.secure_url || Placeholder
                      }
                      alt='loading'
                      className=' h-[82px] mb-5 sm:h-[246px] object-cover  w-[82px] sm:w-[280px] lg:w-[415px] rounded-[10px]'
                    />
                    {/* <Lazyloading
                      src={
                        property?.smallImage?.length > 2
                          ? index + 2 >= property?.smallImage?.length
                            ? Placeholder
                            : `${SMALL_IMAG_URL}/${
                                property?.smallImage[index + 2]
                              }`
                          : Placeholder
                      }
                      alt='loading'
                      className=' h-[82px] sm:hidden   object-cover  w-[82px] sm:w-[280px]   rounded-[10px]'
                    /> */}

                    <div
                    
                    // ref={videoRef}
                      onClick={handleYoutubeVideo}
                      className={`cursor-pointer `}
                    >
                      <iframe
                        style={{ pointerEvents: 'none' }}
                        className=' hidden h-[82px] md:block object-cover lg:w-[415px]  w-[82px] sm:w-[280px] sm:h-[246px] rounded-[10px]'
                        src={property.projectVideo}
                      ></iframe>
                    </div>

                    {/* enquiries */}

                    <div className=' border h-[240px] sticky top-1 z-30  bg-white  py-3  px-2 mt-4 rounded-[15px]  lg:flex-none lg:max-w-[420px]   hidden lg:block '>
                      <form onSubmit={handleThirdRegisterSubmit} className=''>
                        <h1 className='text-[26px] sf-medium text-center mb-3'>
                          Register Your interest
                        </h1>
                        <input
                          type='text'
                          disabled={setFormIsLoading}
                          value={thirdRegisterName}
                          required
                          autoFocus={true}
                          onChange={e => setThirdRegisterName(e.target.value)}
                          placeholder='Name'
                          className='w-full poppins font-normal mb-1 rounded-[10px] ps-4 outline-none py-4 text-[12px] border border-[#E4E4E4]'
                        />

                        <PhoneInput
                        countryCodeEditable={false}

                          country={'ae'}
                          placeholder='Phone'
                          disabled={formIsLoading}
                          inputProps={{
                            require: true,
                            name: 'Phone',
                          }}
                          value={thirdRegisterNumber}
                          buttonClass='!border-none !bg-transparent'
                          inputClass='!outline-none  !border-none !w-full'
                          containerClass='!outline-none !w-[100%] !py-[8px] !px-[10px] !appearance-none !border !border-[#E4E4E4] !text-xs !poppins !rounded-[10px]'
                          onChange={phone => setThirdRegisterNumber(phone)}
                        />

                        <input
                          type='submit'
                          value={formIsLoading ? 'Submiting...' : 'Submit'}
                          disabled={formIsLoading}
                          className='outline-none cursor-pointer w-[100%] py-4 px-5  appearance-none border bg-black text-white mt-2 text-xs poppins rounded-[10px]'
                        />
                      </form>
                    </div>

                    {/* enquiries */}

                    {/* sidebanner */}

                    {
                      <div className='w-[338px] m-auto h-[670px] sticky top-[250px] mt-0 '>
                        <Swiper
                          style={{
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                          }}
                          spaceBetween={30}
                          centeredSlides={true}
                          autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                          }}
                          modules={[Autoplay]}
                          className='mySwiper'
                        >
                          {/* {adsState &&
                            adsState
                              .filter(i => {
                                if (i.property) return true;
                              })
                              ?.map((item, index) => {
                                return (
                                  <SwiperSlide
                                    className='cursor-pointer'
                                    onClick={() =>
                                      navigate(
                                        `/property/${item.property.projectTitle}/${item.property._id}`
                                      )
                                    }
                                    key={index}
                                  >
                                    <Lazyloading
                                      src={`${MAIN_IMAG_URL}/${item?.mainImgaeLink}`}
                                      className='w-full h-full object-cover'
                                      alt='banner'
                                    />
                                  </SwiperSlide>
                                );
                              })} */}



                              { adsState.length > 0 && adsState.map((item)=>{
                                return(
<SwiperSlide
                                  className='cursor-pointer'
                                  onClick={() =>{
                                    navigate(
                                      `/property/${item?.property?.slug}`,
                                      // `/property/${item?.property?.projectTitle?.trim().toLowerCase().replace(/\s+/g, "-")}`
                                      // `/property/${item?.property?.projectTitle}/${item?.property?._id}`
                                    )
                                    // console.log(`/property/${item?property?.slug}`)
                                  }}
                                  key={index}
                                >
                                  <Lazyloading
                                    src={item?.imageFile?.secure_url}
                                    className='w-full h-full object-cover'
                                    alt='banner'
                                  />
                                </SwiperSlide>
                                )
                              })
                                  
                              }
                        </Swiper>
                      </div>
                    }
                    {/* sidebanner */}
                  </div>
                  {/* right side */}
                </div>
                {/* image banner */}
              </section>

              <section className=' mt-[24px] px-6  md:px-20 lg:px-28 w-full'>
                <div className='pt-1 pb-0'>

                <div className="md:hidden flex mb-4">
                 
              {/*  */}
              <div className='max-w-[600px] w-full m-auto h-[250px]  mt-0 '>
                        <Swiper
                          style={{
                            width: '100%',
                            height: '100%',
                            textAlign: 'center',
                          }}
                          spaceBetween={30}
                          centeredSlides={true}
                          autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                          }}
                          modules={[Autoplay]}
                          className='mySwiper'
                        >
                        


                              { adsState.length > 0 && adsState.filter(item => item.landScape && Object.keys(item.landScape).length > 0).map((item)=>{
                                return(
<SwiperSlide
                                  className='cursor-pointer'
                                  onClick={() =>{
                                    if(item.property && item.property.projectTitle  && item.property._id)
                                    navigate(
                                      `/property/${item?.property?.slug}`,
                                      // `/property/${item?.property?.projectTitle?.trim().toLowerCase().replace(/\s+/g, "-")}`
                                      // `/property/${item?.property?.projectTitle}/${item?.property?._id}`
                                    )
                                  }
                                   
                                  }
                                  key={index}
                                >
                                  <Lazyloading
                                    src={item?.landScape?.secure_url}
                                    className='w-full h-full object-cover'
                                    alt='banner'
                                  />
                                </SwiperSlide>
                                )
                              })
                                  
                              }
                        </Swiper>
                      </div>
              {/*  */}
                                
                  </div>



                  <h1 className='text-center sf-medium lg:font-bold lg:text-[40px] text-[25px] mt-0 my-0 text-black'>
                    Similar Projects
                  </h1>

                
                  <div className='flex flex-col justify-center items-center '>
            <div className="mt-5 mb-20
             w-full grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3   gap-7 max-w-[1300px]">
                   
                      {properties &&
                        properties
                          .filter(i => i.projectTitle.toLowerCase() !== name.toLowerCase())
                          .map((item, index) => {
                            if (index < 3) {
                              return (
                                <PropertiesCard
                                  handleRegister={handleRegister}
                                  navigate={navigate}
                                  key={index}
                                  item={item}
                                />
                              );
                            }
                          })}
                    </div>
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
                  className='w-full h-screen z-50 fixed top-0  flex justify-center items-center left-0'
                  style={{ background: 'rgba(0,0,0,0.9' }}
                >
                  <div className=' relative rounded-[20px] py-7 max-w-[820px] w-[90%] lg:w-full   flex flex-col  bg-white px-[20px]  justify-center items-center '>
                    <Lazyloading
                      alt={'loading'}
                      src={SuccessLabel}
                      className={
                        'w-[76px] h-[76px] md:w-[109px] md:h-[109px] mt-10 object-cover cursor-pointer'
                      }
                    />
                    <div>
                      {/* <Lazyloading onClick={closeRegister} src={CloseSVG} alt="loading"  className="w-6 h-6" />  */}
                      <div
                        className=''
                        onClick={() => setSuccessCLoseModal(false)}
                      >
                        <Lazyloading
                          className={
                            'w-6 h-6 cursor-pointer absolute right-8 top-6'
                          }
                          src={CloseSVG}
                          alt={'loading'}
                        />
                      </div>
                    </div>
                    <h1 className='text-[20px] text-center lg:text-[30px] poppins-semibold mt-4 '>
                      Your Interest has Been Registered
                    </h1>
                    <h2 className='text-[16px] text-center lg:text-[18px]  poppins-medium mt-3'>
                      Our team will contact you shortly
                    </h2>
                  </div>
                </div>
              )}

              {/* image modal */}
              {toggleImagePoppup && (
                <div className='fixed bottom-0 w-full h-[100vh] overflow-auto z-[500] bg-white top-0 '>
                  <h1
                    onClick={handleToggleImagePoppup}
                    className='absolute top-3 right-0 text-right me-5 pt-2 text-3xl'
                  >
                    <Lazyloading
                      src={BgBlackCLoseIcon}
                      alt={'close'}
                      className={
                        'sm:w-[50px] select-none sm:h-[50px] w-[44px] h-[38px] cursor-pointer '
                      }
                    />
                  </h1>
                  <div className='h-screen flex-col flex pt-[100px] lg:pt-3 items-center  px-5 lg:px-28'>
                    <div className='w-[100%] h-[318px] md:h-[450px] mb-5 xl:h-[591px] justify-center  rounded-[20px] object-cover overflow-hidden flex'>
                      {fullImages?.length > 0 && (
                        <div className='relative'>
                          <Lazyloading
                            // src={` ${
                            //   indexOf === 0
                            //     ? MAIN_IMAG_URL + '/' + property?.smallImage[0]
                            //     : SMALL_IMAG_URL +
                            //       '/' +
                            //       property?.smallImage[indexOf]
                            // }`}
                            src={ fullImages[indexOf]?.secure_url }

                            className='select-none cursor-text w-full h-full rounded-[20px] overflow-hidden md:w-[981px] object-cover '
                            alt=''
                          />
                        </div>
                      )}
                    </div>
                    <div className='lg:w-fit w-full lg:max-w-[1100px] flex justify-between items-center  '>
                      <div
                        onClick={previosIndexOfMianImage}
                        className='me-3 cursor-pointer w-[44px] h-[44px] bg-[#666666] rounded-[10px] flex justify-center items-center'
                      >
                        <Lazyloading src={LeftSVGWhite} alt={'left arrow'} />
                      </div>

                      <div className=' flex-1  overflow-auto lg:w-fit justify-center items-center flex  gap-2 h-full '>
                        {fullImages?.map((item, index) => {
                          return (
                            <Lazyloading
                              onClick={() => setIndexOf(index)}
                              key={index}
                              // src={`${
                              //   index === 0
                              //     ? MAIN_IMAG_URL + '/' + item
                              //     : SMALL_IMAG_URL + '/' + item
                              // }`}
                              src={fullImages[index]?.secure_url || Placeholder} 
                              // src={Placeholder}
                              className={`${
                                indexOf === index && 'border-[3px] border-black'
                              } w-[82px] select-none cursor-pointer h-[82px] object-cover rounded-[10px]`}
                              alt=''
                            />
                          );
                        })}
                      </div>

                      <div
                        onClick={nextIndexOfMianImage}
                        className='ms-3 cursor-pointer w-[44px] h-[44px] bg-[#666666] rounded-[10px] flex justify-center items-center'
                      >
                        <Lazyloading src={RightSVGWhite} alt={'left arrow'} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* image modal */}

              {/* youtube video */}
              {youtubePopupView && (
                <div className='bg-white flex justify-center items-center h-screen z-[99999] w-full fixed top-0 left-0'>
                  <h1
                    onClick={handleYoutubeVideo}
                    className='absolute top-2 right-0 text-right me-5 pt-2 text-3xl'
                  >
                    <Lazyloading
                      src={BgBlackCLoseIcon}
                      alt={'close'}
                      className={
                        'sm:w-[50px]  sm:h-[50px] w-[44px] h-[38px] cursor-pointer '
                      }
                    />
                  </h1>
                  <iframe
                    style={{ userSelect: 'none' }}
                    className=' flex h-[318px] md:h-[645px] iframe-custom-class w-[90%]  lg:w-[1077px]'
                    src={property.projectVideo}
                  ></iframe>
                </div>
              )}
              {/* youtube video */}

              {/* map */}
              {mapPopupView && (
                <div className='bg-white flex justify-center items-center h-screen z-[99999] w-full fixed top-0 left-0'>
                  <h1
                    onClick={handleMap}
                    className=' absolute top-2 right-0 text-right me-5 pt-2 text-3xl'
                  >
                    <Lazyloading
                      src={BgBlackCLoseIcon}
                      alt={'close'}
                      className={
                        'sm:w-[50px] sm:h-[50px] w-[44px] h-[38px] cursor-pointer '
                      }
                    />
                  </h1>
                  <iframe
                    src={property?.mapLink}
                    className='flex iframe-custom-class h-[580px] md:h-[645px] w-[90%]  lg:w-[1077px]'
                    allowFullScreen=''
                    referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
                </div>
              )}
              {/* map  */}
            </>

            <Footer />

            {/* bottom register now button */}
            {!modal && !successCLoseModal && (
              <div className='sm:hidden bg-[#FFFFFF] border rounded-t-[20px] max-[430px]:px-5 fixed flex justify-center items-center z-50 text-[14px] bottom-[0px] h-[103px] w-full'>
                <button
                  onClick={() =>
                    handleRegister(property._id, property.developerId)
                  }
                  className='bg-black flex rounded-[7px] justify-center items-center max-w-[382px] w-full h-[53px] text-white'
                >
                  Enquire Now
                </button>
              </div>
            )}
            {/* bottom register now button */}
          </div>
        </>
     
    </>
  );
}

export default UserViewProjects;
