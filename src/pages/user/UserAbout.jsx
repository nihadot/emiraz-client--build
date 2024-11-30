import React, { useState } from "react";
import Header from "../../components/user/Header";
import { AboutBanner, AboutCard } from "../../assets/images";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Lazyloading from "../../components/Lazyloading/Lazyloading";

function UserAbout() {
  const [loading, setLoading] = React.useState(false);

  const [para1, setPara1] = useState(`
  A one stop solution for all your property needs, the
                      ‘PropertySeller’ has been disrupting the real estate
                      sector in the UAE in ways never imagined before. A
                      comprehensive real estate portal, the ‘Property Seller’,
                      it has been conceived to provide a seamless, effective,
                      intuitive and transparent way to transact properties
                      across the country.
  `);

  const [para2, setPara2] =
    useState(`Available in web and mobile apps, it lets you experience
  the convenience of property management and transactions at
  the tip of your fingers. Designed to address all your
  property needs it revolves around the concept of property
  management and Real Estate Consultancy, with the widest
  portfolio of properties listed and supported by investors
  and promoters that are names to reckon, in the industry.`);

  const [para3, setPara3] =
    useState(`It caters to your needs at any given stage of your Real
  Estate exploration life cycle, with well thought out
  strategies executed through different channels to ensure
  smooth transitions. Our transactions are simple, ethical
  and are executed in a professional-way, ensuring smooth
  business contracts. We have well defined guidelines that
  help you understand and adhere to the rules prevalent in
  the country, letting you enjoy hassle free transactions
  with all contractual obligations in place. `);

  const [para4, setPara4] =
    useState(`  Our reputation stems from pampering our customers with
  meticulous services. Our clients qualify for several
  advantages as they navigate the portal which includes the
  opportunity to be intimated first on the properties as
  they get listed. Besides at every point in advancement we
  ensure that our customers are rewarded well. We have been
  continuously evolving in challenging ourselves with
  discovering new avenues to serve you better. `);

  const [para5, setPara5] =
    useState(`  We understand your needs like no other and help you in the
  realization of your dreams. Our information is sourced and
  supported by research, tech, data analysis, automation and
  management expertise making it more organized and reliable
  with enabling our clientelle to capitalize and reap
  rewards on their investment. Explore the Property Seller
  to learn more of the unlimited opportunities. Know what it
  does and why it can’t be done without. `);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const seo_description = `${para1} \n ${para2} \n ${para3} \n ${para4} \n ${para5} `;
  const seo_title = `About Us`;
  const seo_site_url = `${window.location.href}`;

  return (
    <>
      <Helmet>
      <meta name="author" content="Property Seller"></meta>

      <title>{seo_title?.length > 65 ?  seo_title?.slice(0,65) :  seo_title  }</title>
            <meta name="description" content={seo_description?.length > 170 ?  seo_description?.slice(0,170) :  seo_description  } />
            <link rel="canonical" href={seo_site_url}></link>
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
        <meta property="og:image" content={seo_description} />
        <meta property="og:url" content={seo_site_url} />
        <meta property="og:type" content="website" />
      </Helmet>
     
        <>
          <div className="w-full">
            <div className=" px-6 mt-4">
              <Header />
            </div>
            <section className=" px-6 w-full m-auto mt-8 600px:mt-3">
              <section className="relative main-about m-auto rounded-[10px] overflow-hidden mt-0 h-[170px] ">
                <Lazyloading alt={'About Us'} src={AboutBanner} className="w-full h-full object-cover" />
                <div className="flex w-full justify-center items-center h-full absolute top-0 left-0 ">
                  <h1 className=" text-white sf-medium-600 text-[45px] lg:text-[70px] ">
                    About Us
                  </h1>
                </div>
              </section>
              <div className="flex flex-col justify-center my-4 lg:my-14 items-center md:mx-20 lg:mx-28 ">
                <section className="grid  gap-3 grid-cols-1 lg:grid-cols-2">
                  <div className="">
                    <p className="poppins-medium text-[15px] break-words text-[#666666] mt-4">
                      {para1}
                    </p>

                    <p className="poppins-medium text-[15px] break-words text-[#666666] mt-4">
                      {para2}
                    </p>

                    <p className="poppins-medium text-[15px] break-words text-[#666666]  mt-4">
                      {para3}
                    </p>

                    <p className="poppins-medium text-[15px] break-words text-[#666666]  mt-4">
                      {para4}
                    </p>

                    <p className="poppins-medium text-[15px] break-words text-[#666666]  mt-4">
                      {para5}
                    </p>
                  </div>
                  <div className=" mt-0 lg:mt-0 flex justify-center items-center ">
                    <img
                      src={AboutCard}
                      loading="lazy"
                      alt="About Us"
                      className="w-full h-[400px] mg:h-auto object-contain"
                    />
                  </div>
                </section>
              </div>
            </section>
            <Footer />
          </div>
        </>
      
    </>
  );
}

export default UserAbout;
