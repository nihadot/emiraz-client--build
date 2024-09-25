import React, { useEffect, useState } from "react";
import { Instagram } from "../icons";
import { Link } from "react-router-dom";
import Lazyloading from "./Lazyloading/Lazyloading";
import logo from "../assets/logo/ps_logo.png";
import { fetchPropertyTypeAPI } from "../api";
import {desktopAppLogo,mobileAppLogo} from "../assets/images/";
import "./index.css";
import { footerMobileLogo } from "../assets/icons";
function Footer() {
  const [data, setData] = useState([]);

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
  }, []);

  return (
    <>
      <footer className="bg-black hidden sm:block pb-7">
        <div className="lg:mx-20 xl:mx-28 hidden 600px:flex mb-8 justify-center items-center pt-0  h-[100px]">
          <div className="w-[356px] h-[55px]">
          <Lazyloading
            alt={"desktopLogo"}
            src={desktopAppLogo}
            className={"w-full h-full object-contain "}
            />
            </div>
        </div>
        <div className=" lg:mx-20 xl:mx-28">
          <div className=" flex justify-between mb-8 flex-col lg:flex-row overflow-hidden">
            <div className="pb-6 hidden sm:pb-0 lg:flex justify-center items-center">
              <Lazyloading
                alt={"PropertySeller"}
                src={logo}
                className={"w-[200px] hidden 600px:block object-contain  -ml-2"}
              />
              <Lazyloading
                alt={"PropertySeller"}
                src={logo}
                className={
                  " object-contain w-[300px] h-[41px] block 600px:hidden ml-0 "
                }
              />
            </div>
            <div className="poppins w-full font-medium flex capitalize lg:justify-between sm:justify-center justify-between lg:mt-0 mt-5 items-center">
              <div className=" flex justify-end w-full gap-4 items-center flex-row sm:flex">
                <Link to={"/"}>
                  <p className="mb-3 sm:mb-0 text-white text-[10px] sm:text-[14px]  ps-4 pe-3">
                    Home
                  </p>
                </Link>
                <Link to={"/about"}>
                  <p className="mb-3 sm:mb-0 text-white text-[10px] sm:text-[14px]  ps-4 pe-3">
                    About Us
                  </p>
                </Link>
                <Link to={"/blog"}>
                  <p className="mb-3 sm:mb-0 text-white text-[10px] sm:text-[14px]  ps-4 pe-3">
                    Blog
                  </p>
                </Link>
                {data &&
                  data.map((item, index) => {
                    if (index < 4) {
                      return (
                        <Link
                          key={item.propertyType._id}
                          to={`/property-type/${item.propertyType._id}/${item.propertyType.name}`}
                        >
                          <p
                            className={`${
                              index < 3
                                ? "mb-3 sm:mb-0 text-white text-[10px] sm:text-[14px]  ps-4 pe-3"
                                : "mb-3 sm:mb-0 text-white text-[10px] sm:text-[14px]  pe-0"
                            } `}
                          >
                            {item.propertyType.name}
                          </p>
                        </Link>
                      );
                    }
                  })}
              </div>
              <div className="flex gap-4 items-center sm:hidden ps-2.5 me-5">
                <a
                  className="cursor-pointer"
                  href="https://www.instagram.com/propertyselleruae?igsh=MTJsN3M2MWR4NDd2bw=="
                  target="_blank"
                >
                  <Instagram width="18" height="30" fill="#fff" />
                </a>
                <a
                  href="https://www.instagram.com/propertyselleruae?igsh=MTJsN3M2MWR4NDd2bw=="
                  target="_blank"
                  className="cursor-pointer"
                >
                  <span className="text-white text-[10px] sm:text-[14px] ">
                    Follow Us
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <hr className="bg-white" />
          </div>
          <div className="flex poppins font-medium items-center justify-between mt-4 pb-0">
            <p className="text-white text-[10px] sm:text-[14px]">
              Copyright &#169; PropertySeller
            </p>
            <div className="hidden justify-end sm:flex gap-0 ps-11 items-end">
              <div className="flex justify-end items-end h-full w-full">
                <a
                  aria-label="Instagrm link, user can click to navigate our official page"
                  href="https://www.instagram.com/propertyselleruae?igsh=MTJsN3M2MWR4NDd2bw=="
                  target="_blank"
                  className="cursor-pointer "
                >
                  <Instagram width="18" height="30" fill="#fff" />
                </a>
              </div>
              <a
                aria-label="Instagrm link, user can click to navigate our official page"
                href="https://www.instagram.com/propertyselleruae?igsh=MTJsN3M2MWR4NDd2bw=="
                target="_blank"
                className="cursor-pointer"
              >
                {/* <span className="text-white text-[13px]">Follow Us</span> */}
              </a>
            </div>
            <div className="flex gap-10">
              <p className="text-white text-[10px] sm:text-[14px]">
                <Link to={"/terms-conditions "}>Terms of Use</Link>
              </p>
              <p className="text-white text-[10px] sm:text-[14px]">
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* mobile footer */}
      <footer className="bg-black w-full block sm:hidden">
        <div className="flex pt-7 justify-center items-center">
          <img
            src={footerMobileLogo}
            className="object-contain w-[300px] h-[41px]"
            alt=""
          />
        </div>
        <div className="mx-6 items-center my-3 flex justify-between">
          <div className="poppins gap-1 flex w-full flex-col">
            <Link to={"/"}>
              <p className="mb-3 sm:mb-0 text-white text-[14px] sm:text-[14px] border-0 sm:border-r border-solid border-white pe-7">
                Home
              </p>
            </Link>
            <Link to={"/about"}>
              <p className="mb-3 sm:mb-0 text-white text-[14px] sm:text-[14px] border-0 sm:border-r border-white pe-7">
                About Us
              </p>
            </Link>
            <Link to={"/blog"}>
              <p className="mb-3 sm:mb-0 text-white text-[14px] sm:text-[14px] border-0 sm:border-r border-white pe-7">
                Blog
              </p>
            </Link>
            {data &&
              data.map((item, index) => {
                if (index < 4) {
                  return (
                    <Link
                      key={item.propertyType._id}
                      to={`/property-type/${item.propertyType._id}/${item.propertyType.name}`}
                    >
                      <p
                        className={`${
                          index < 3
                            ? "mb-3 sm:mb-0 text-white text-[14px] sm:text-[14px] border-0 sm:border-r border-white pe-7"
                            : "mb-3 sm:mb-0 text-white text-[14px] sm:text-[14px] border-0  border-white pe-3"
                        } `}
                      >
                        {item.propertyType.name}
                      </p>
                    </Link>
                  );
                }
              })}
          </div>
          <div className="flex flex-col gap-1">

          <Lazyloading
            alt={"mobileStoreLogo"}
            src={mobileAppLogo}
            className={"w-[240px] h-[138px] m-auto object-contain "}
            />
          
            </div>
        </div>

        <hr className="mb-4" />

        <div className="pb-4 356px:flex-row flex-col text-white poppins text-[10px] items-center flex justify-between mx-6">
        <p className="text-white text-[10px] poppins sm:text-[14px]">
              Copyright &#169; PropertySeller
            </p>

            <a
                  aria-label="Instagrm link, user can click to navigate our official page"
                  href="https://www.instagram.com/propertyselleruae?igsh=MTJsN3M2MWR4NDd2bw=="
                  target="_blank"
                  className="cursor-pointer"
                >
                  <Instagram width="18" height="30" fill="#fff" />
                </a>

                <div className="flex gap-2">
              <p className="text-white poppins text-[10px] sm:text-[14px]">
                <Link to={"/terms-conditions "}>Terms of Use</Link>
              </p>
              <p className="text-white poppins text-[10px] sm:text-[14px]">
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
              </p>
            </div>
                

         </div>
      </footer>
      {/* mobile footer */}

    </>
  );
}

export default Footer;
