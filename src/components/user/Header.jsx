import React, { useEffect, useState } from "react";
import "./card.css";
import { SuccessLabel } from "../../assets/images/";
import WhiteLogo from "../../assets/logo/ps_logo_black.png"
import BlackLogoForWhite from "../../assets/logo/ps_logo.png";
import { HamburgerSVG, HamburgBlackWhiteBg, Search } from "../../assets/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { fetchPropertyTypeAPI, searchAPI, SERVER_URL } from "../../api";
import Lazyloading from "../Lazyloading/Lazyloading";
import Placeholder from "../../assets/placeholder/placeholder-image.png";
import axios from "axios";
import { errorToast } from "../../toast";
import { useDispatch } from "react-redux";
import { searchResult } from "../../features/searchSlice";
import _ from "lodash";

function Header() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [togggleButton, setToggleButton] = React.useState(false);

  const [data, setData] = useState([]);
  const [pathName, setPathName] = useState();

  const [isFormSubmitLoading,setIsFormSubmitLoading] = useState(false);

  const [query, setQuery] = useState('');
  const [Searchresults, setSearchResults] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await fetchPropertyTypeAPI();
      setData(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();

    if (pathname === "/") {
      setPathName(true);
    } else {
      setPathName(false);
    }
  }, [pathname]);

  const handleSubmit = e => {
    setIsFormSubmitLoading(true);
    e.preventDefault();
    fetchQuery(query);
  };



  // useEffect(() => {
  //   if (query.length > 2) {
  //     const timerId = setTimeout(() => {
  //       fetchQuery(query);
  //     }, 300); // Debouncing with 300ms delay

  //     return () => {
  //       clearTimeout(timerId);
  //     };
  //   } else {
  //     setSearchResults([]);
  //   }
  // }, [query]);
  

  const fetchQuery = async (searchQuery) => {

    try {
      const response = await searchAPI(encodeURIComponent(searchQuery))
      if(response.result){
        navigate(`/property/${response?.result?.propretyHeadline?.trim().toLowerCase().replace(/\s+/g, "-")}/${response?.result?._id}`,{state: response?.result});
      }
    } catch (err) { 
      errorToast('Not found property');
      setIsFormSubmitLoading(false);
    }
  };

  const dispatch = useDispatch();

  useEffect(()=>{


  const fetchSearchResults = _.debounce(async(searchQuery)=>{
    try {
      const response = await axios.get(`${SERVER_URL}/property/search`,{
        params:{
          q:searchQuery
        }
      })
      const data = response.data.result;
    dispatch(searchResult(data));
// 
    //  setProperties(data);
    } catch (error) {
      // setProperties([]);
    }
  },300);

  fetchSearchResults(query);


    // console.log(query,'--search')
  },[query]);

  return (
    <>
      <div className={`w-full flex justify-center`}>
        <header
          className={`${pathName ? " bg-black  " : "bg-white border   "} ${
            togggleButton && "fixed  z-[300px]"
          } relative poppins-medium text-white flex justify-between w-full px-4 h-20 items-center  rounded-[10px]`}
        >
          {/*  */}

          
          {/*  is home true, pathname */}
          <Link to={"/"}>
            
              <img
                loading="lazy"
                className="hidden max-w-[200px] 600px:block cursor-pointer object-contain  "
                src={pathName ? BlackLogoForWhite :  WhiteLogo}
                alt={"PropertSeller"}
              />
            

            
              <img
                className="block -ml-[6px] 600px:hidden h-full w-[180px] mt-1 cursor-pointer object-contain  "
                src={pathName ?  BlackLogoForWhite: WhiteLogo }
                alt={"PropertSeller"}
                loading="lazy"
              />
         
          </Link>

          {/* desktop */}
          <ul
            className={`${
              pathName ? "text-white" : "text-black"
            } hidden xl:flex`}
          >
            <li className="px-3 1440px:px-6 flex items-center capitalize">
              <Link to={"/"}>Home</Link>{" "}
              <span
                className={`ms-3 1440px:ms-6 w-[1px] h-4 ${
                  pathName ? "bg-slate-50" : "bg-black"
                }  block`}
              ></span>
            </li>
            <li className="px-3 1440px:px-6 flex items-center">
              <Link to={"/about"}>About Us</Link>{" "}
              <span
                className={`ms-3 1440px:ms-6 w-[1px] h-4 ${
                  pathName ? "bg-slate-50" : "bg-black"
                }  block`}
              ></span>
            </li>
            <li className="px-3 1440px:px-6 flex items-center">
              <Link to={"/blog"}>Blog</Link>{" "}
              <span
                className={`ms-3 1440px:ms-6 w-[1px] h-4 ${
                  pathName ? "bg-slate-50" : "bg-black"
                }  block`}
              ></span>
            </li>



            <li className="px-3 1440px:px-6 flex items-center">
              <Link to={"/property-type/villa"}>Villa</Link>{" "}
              <span
                className={`ms-3 1440px:ms-6 w-[1px] h-4 ${
                  pathName ? "bg-slate-50" : "bg-black"
                }  block`}
              ></span>
            </li>



            <li className="px-3 1440px:px-6 flex items-center">
              <Link to={"/property-type/apartment"}>Apartment</Link>{" "}
              <span
                className={`ms-3 1440px:ms-6 w-[1px] h-4 ${
                  pathName ? "bg-slate-50" : "bg-black"
                }  block`}
              ></span>
            </li>



            <li className="px-3 1440px:px-6 flex items-center">
              <Link to={"/property-type/penthouse"}>Penthouse</Link>{" "}
              <span
                className={`ms-3 1440px:ms-6 w-[1px] h-4 ${
                  pathName ? "bg-slate-50" : "bg-black"
                }  block`}
              ></span>
            </li>



            <li className="px-3 1440px:px-6 flex items-center">
              <Link to={"/property-type/townhouse"}>Townhouse</Link>{" "}
              <span
                className={`ms-3 1440px:ms-6 w-[1px] h-4 ${
                  pathName ? "bg-slate-50" : "bg-black"
                }  block`}
              ></span>
            </li>

            {/* {data &&
              data.map((item, index) => {
                if (index < 4) {
                  return (
                    <li
                      key={item.propertyType._id}
                      className="px-2 flex items-center"
                    >
                      <Link
                        className="capitalize"
                        to={`/property-type/${item.propertyType._id}/${item.propertyType.name}`}
                      >
                        {item.propertyType.name}
                      </Link>{" "}
                      {index < 3 && (
                        <span
                          className={`ms-6 w-[1px] h-4 ${
                            pathName ? "bg-slate-50" : "bg-black"
                          }  block`}
                        ></span>
                      )}
                    </li>
                  );
                }
              })} */}

            <li>
              <div
                className={`${
                  pathName ? "border-none" : " border shadow-sm"
                }   ms-3 relative  text-black h-[45px] overflow-hidden px-5 bg-white rounded-[50px] flex justify-center items-center `}
              >
                <input
                  className={` sf-normal text-[14px] placeholder:text-black pe-2 outline-none border-none `}
                  type="text"
                  placeholder='Search properties...'

                  value={query}
            onChange={(e) => setQuery(e.target.value)}
                />
                <img src={Search} alt="" className="cursor-pointer h-[25px]" />
              </div>
            </li>
          </ul>
          {/* desktop */}

          {togggleButton && (
            <ul
              className={` poppins font-medium text-[15px] capitalize xl:hidden flex flex-col ${
                pathName
                  ? "bg-black text-white"
                  : "bg-white border-gray-400 text-black border"
              } w-full absolute z-50 top-[85px] pt-5 pb-2   rounded-[10px] left-0 `}
            >
              <li className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col ">
                <Link to={"/"} aria-label="Home page route">
                  Home
                </Link>
                <span
                  className={`w-full h-[2px] mt-3 ${
                    pathName ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </li>
              <li className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col ">
                <Link to={"/about"} aria-label="About page route">
                  About Us
                </Link>
                <span
                  className={`w-full h-[2px] mt-3 ${
                    pathName ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </li>
              <li className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col ">
                <Link to={"/blog"} aria-label="Blog page route">
                  Blog
                </Link>
                <span
                  className={`w-full h-[2px] mt-3 ${
                    pathName ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </li>




              <li className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col ">
                <Link to={"/property-type/villa"} aria-label="Blog page route">
                Villa
                </Link>
                <span
                  className={`w-full h-[2px] mt-3 ${
                    pathName ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </li>




              <li className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col ">
                <Link to={"/property-type/apartment"} aria-label="Blog page route">
                Apartment
                </Link>
                <span
                  className={`w-full h-[2px] mt-3 ${
                    pathName ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </li>





              <li className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col ">
                <Link to={"/property-type/penthouse"} aria-label="Blog page route">
                Penthouse
                </Link>
                <span
                  className={`w-full h-[2px] mt-3 ${
                    pathName ? "bg-white" : "bg-black"
                  }`}
                ></span>
              </li>

              


              <li className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col ">
                <Link to={"/property-type/townhouse"} aria-label="Blog page route">
                Townhouse
                </Link>
            
              </li>

              
              {/* {data &&
                data.map((item, index) => {
                  if (index < 4) {
                    return (
                      <li
                        key={item.propertyType._id}
                        className="px-2 mx-4 py-2.5 cursor-pointer flex items-start flex-col "
                      >
                        <Link
                          aria-label={`${item.propertyType.name} page route`}
                          className="capitalize"
                          to={`/property-type/${item.propertyType._id}/${item.propertyType.name}`}
                        >
                          {item.propertyType.name}
                        </Link>{" "}
                        { (index+1) < data.length &&
                          <span
                            className={`w-full h-[2px] mt-3 ${
                              pathName ? "bg-white" : "bg-black"
                            }`}
                          ></span>
                        }
                      </li>
                    );
                  }
                })} */}

{/* 

<li className=' flex items-center'>
              <Link to={'/property-type/villa'}>Villa</Link>{' '}
              <span
                className={`mx-8 w-[1px] h-4 ${
                  pathName ? 'bg-slate-50' : 'bg-black'
                }  block`}
              ></span>
            </li> */}


{/* 
            <li className=' flex items-center'>
              <Link to={'/property-type/apartment'}>Apartment</Link>{' '}
              <span
                className={`mx-8 w-[1px] h-4 ${
                  pathName ? 'bg-slate-50' : 'bg-black'
                }  block`}
              ></span>
            </li> */}


            {/* <li className=' flex items-center'>
              <Link to={'/property-type/penthouse'}>Penthouse</Link>{' '}
              <span
                className={`mx-8 w-[1px] h-4 ${
                  pathName ? 'bg-slate-50' : 'bg-black'
                }  block`}
              ></span>
            </li> */}



              {/* <li className="px-2 mx-4 pt-1 mb-3 cursor-pointer ">
                <div
                  className={`${
                    pathName
                      ? "border-none"
                      : " border border-gray-400 shadow-sm"
                  }   relative  text-black h-[45px] overflow-hidden px-5 bg-white rounded-[6px] flex justify-between items-center `}
                >
                  <input
                    className={` sf-normal text-[14px] placeholder:text-black outline-none border-none `}
                    type="text"
                    placeholder="Enter Project No"
                    value={query}
            onChange={(e) => setQuery(e.target.value)}
                  />
                  <img src={Search} alt="" className="h-[22px]" />
                </div>
              </li> */}
            </ul>
          )}

          {!togggleButton && (
            <div
              className="flex xl:hidden"
              onClick={() => setToggleButton(true)}
            >
              <Lazyloading
                src={pathName ? HamburgerSVG : HamburgBlackWhiteBg}
                className="w-6 h-6 object-cover cursor-pointer"
                alt="Menu"
              />
            </div>
          )}

          {togggleButton && (
            <div
              className="text-[60px] cursor-pointer flex xl:hidden"
              onClick={() => setToggleButton(false)}
            >
              <p className={`${pathName ? "text-white" : "text-black"}`}>
                &times;
              </p>
            </div>
          )}
        </header>
      </div>

      {/* <div className="flex xl:hidden">
        <div
          className={`${
            pathName ? "flex" : " hidden"
          }   mt-2 relative  text-black h-[45px] overflow-hidden px-5 rounded-[50px]  justify-between items-center bg-white w-[90%] m-auto `}
        >
          <input
            className={` sf-normal text-[14px] placeholder:text-black outline-none border-none `}
            type="text"
            placeholder="Enter Project No"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
    
          />
          <img src={Search} alt="" className="h-[20px]" />
        </div>
      </div> */}
    </>
  );
}

export default Header;
