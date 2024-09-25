import Lazyloading from "../Lazyloading/Lazyloading";
import  WhiteLogo  from "../../assets/logo/ps_logo.png";
import "./loader.css"
function LogoLoader() {
  return (
    <div className={`h-screen w-full 600px:bg-black bg-white flex justify-center items-center`}>
      <div className="w-[80%] md:w-[45%]">
        <img
          src={WhiteLogo}
          className={
            "animate-pulse 600px:block hidden px-5 w-full h-full object-cover md:object-contain"
          }
        />
        <div className="loader block 600px:hidden m-auto"></div>
      </div>
    </div>
  );
}

export default LogoLoader;
