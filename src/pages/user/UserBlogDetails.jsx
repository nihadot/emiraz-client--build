import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/user/Header";
import { MAIN_IMAG_URL, getBlogById, getBlogByName, getBlogs } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import Placeholder from "../../assets/placeholder/placeholder-image.png";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";
import Lazyloading from "../../components/Lazyloading/Lazyloading";

function UserBlogDetails() {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [blog, setBlog] = React.useState({});
  const { id,name } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!name) {
      navigate("/");
    }
    fetchdata();
    window.scrollTo(0, 0);
  }, [navigate]);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const blogs = await getBlogs();
      const filteredData = blogs?.result?.filter((item)=> item.slug !== name )
      setBlogs(filteredData);
      const blog = await getBlogByName(name);
      setBlog(blog.result);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  const seo_description = blog?.blogBody;
  const seo_title = blog?.blogTitle;
  const seo_site_url = `${window.location.href}`;


  return (
    <>
   
        <>

 

<Helmet>
        <title>{seo_title}</title>
        <meta name="author" content="Property Seller"></meta>

        <meta name="description" content={seo_description?.length > 170 ?  seo_description?.slice(0,170) :  seo_description  } />
        <meta property="og:title" content={seo_title} />
        <meta property="og:description" content={seo_description} />
        <meta property="og:image" content={seo_description} />
        <meta property="og:url" content={seo_site_url} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={seo_site_url}></link>
      </Helmet>
          <div>
            <div className="mt-4 mx-6">
              <Header />
            </div>
            <section className="  mt-[24px] px-6  lg:px-20 xl:px-28 w-full ">
              <div className="">
                <div className="block lg:flex w-full h-full   lg:gap-3  ">
                  <div className="flex-none lg:flex-[70%] lg:w-[749px] ">
                    { blog && <BlogBody item={blog} />}
                  </div>
                  <div className="flex-[30%] lg:w-[847px]">
                    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 mt-0  gap-5">
                      {blogs &&
                        blogs?.map((item, index) => {
                          if (index < 3) {
                            return (
                              <div
                                key={item._id}
                                className="px-4 pt-4 py-3 border rounded-[15px] h-fit cursor-pointer"
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
                                <div className="poppins-medium text-2xl  mt-1">
                                  <h1 className="blog-title text-[25px] my-3">
                                    {item.blogTitle}
                                  </h1>
                                </div>
                                <div className="blog-description break-words poppins-medium text-[15px] text-[#666666] text-left mt-3">
                                  <p>
                                    {item.blogBody}
                                  </p>
                                </div>
                                <div className="mt-4 mb-2">
                                  <button
                                    onClick={() =>
                                      navigate(
                                        `/blog/${item.slug}/`
                                        // `/blog/${item._id}/${item.blogTitle.trim().toLowerCase().replace(/\s+/g, '-')}/`
                                      )
                                    }
                                    type="button"
                                    className="bg-white border border-[#000000] w-full py-3 rounded-[5px] text-[10px] poppins-semibold"
                                  >
                                    Keep Reading
                                  </button>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Footer />
          </div>
        </>
   
    </>
  );
}

export default UserBlogDetails;

const BlogBody = ({ item }) => {
  return (
    <div className=" mb-20">
      <Lazyloading
        src={item?.imageFile?.secure_url}
        className="rounded-[20px] w-full h-[322px] md:h-[514px] xl:w-full  object-cover "
        alt={item.blogTitle}
      />
      <h1 className="poppins-semibold text-[30px] lg:leading-tight lg:text-[40px] mb-4 mt-6">
        {item.blogTitle}
      </h1>
      {item.date && (
        <p className="text-[10px] sf-medium lg:text-[20px] text-[#666666]">
          {new Date(item.date).toDateString()}
        </p>
      )}

      <p className="whitespace-pre-line sf-medium break-words my-5 text-[14px] lg:text-[15px]  text-[#666666]">
        {item.blogBody}
      </p>
    </div>
  );
};
