import React from "react";
import { Banner } from "../../assets/images";
import Lazyloading from "../Lazyloading/Lazyloading";
import "./home.css"

function HomeIndex({ children }) {
  return (
    <div className=" h-[800px] sm:block hidden home sm:h-screen relative overflow-hidden sm:overflow-visible  ">
      { Banner && <img
        alt={"Banner"}
        className="object-cover w-full h-[850px] sm:h-full"
        src={Banner}
        loading="lazy"
        
        key={1}
      />}
      <div className="absolute top-3 w-full">{children}</div>
    </div>
  );
}

export default HomeIndex;
