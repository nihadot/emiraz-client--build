import React from "react";
import Header from "../../components/user/Header";
import Footer from "../../components/Footer";
import { MAIN_IMAG_URL, getBlogs } from "../../api";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { Helmet } from "react-helmet";
import Lazyloading from "../../components/Lazyloading/Lazyloading";
function UserBlog() {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const blogs = await getBlogs();
      setBlogs(blogs.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };




  const seo_description = "Property for Sale in Dubai, UAE  | Off-plan Properties for sale in Dubai, UAE | Off-plan Apartments for Sale in Dubai, UAE";
const seo_title = `Blogs`;
const seo_site_url = `${window.location.href}`;


  return (
    <div>

   <Helmet>
   <title>
              {seo_title?.length > 65 ? seo_title?.slice(0, 65) : seo_title}
            </title>
            <meta name="author" content="Property Seller"></meta>

        <meta name="description" content={seo_description?.length > 170 ?  seo_description?.slice(0,170) :  seo_description  } />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
        <meta property="og:image" content={seo_description} />
        <meta property="og:url" content={seo_site_url} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={seo_site_url}></link>
      </Helmet>
    
        <>


          <div className="mx-6 mt-4">
            <Header />
          </div>

          <h1 className="text-center mt-4 sf-medium-600 text-[50px] lg:text-[70px]">
            Blogs
          </h1>
          <section className="max-w-[1400px] w-full m-auto">
            <div className="mx-6 flex flex-col justify-center mt-0 mb-4  lg:my-14 items-center md:mx-20 lg:mx-28 ">
              <div className="grid xl:grid-cols-3 my-5  lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 mt-4  gap-5">
                {blogs &&
                  blogs.map((item, index) => {
                    
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
                            />
                          </div>
                          <div className="poppins-medium text-2xl">
                            <h1 className="blog-title text-[25px] pt-4">
                            {item.blogTitle}
                            </h1>
                          </div>
                          <div className="blog-description break-words poppins-medium text-sm text-[#666666] text-left mt-3">
                            <p>
                            {item.blogBody}
                            </p>
                          </div>
                          <div className="my-4">
                            <button
                              type="button"
                              className="bg-white border border-[#000000] w-full py-3 rounded-[5px] text-[10px] poppins-semibold"
                              onClick={() =>
                                navigate(`/blog/${item.slug}/`)
                                // navigate(`/blog/${item._id}/${item.blogTitle.trim().toLowerCase().replace(/\s+/g, '-')}/`)
                              }
                            >
                              Keep Reading
                            </button>
                          </div>
                        </div>
                      );
                    
                  })}
                <div className="mt-4 mb-10 flex justify-center">
                  <button
                    onClick={() => navigate("/blog")}
                    className="block sm:hidden px-6 py-4  bg-black text-white rounded-[10px] w-fit poppins-semibold"
                  >
                    View All Blogs
                  </button>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
   
    </div>
  );
}

export default UserBlog;
