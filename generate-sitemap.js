import { SitemapStream, streamToPromise } from 'sitemap';
import { writeFileSync } from 'fs';
import axios from 'axios';



const getProperties = async (query) => {
    try {
      const response = await axios.get(`https://www.propertyseller.ae/api/v1/property`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };

const getBlogs = async () => {
    try {
      const response = await axios.get(`https://www.propertyseller.ae/api/v1/blog`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };

  export const fetchPropertyType = async () => {
    try {
      const response = await axios.get(`https://www.propertyseller.ae/api/v1/property-type`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };


  export const getCities = async () => {
    try {
      const response = await axios.get(`https://www.propertyseller.ae/api/v1/city`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };

async function generateSitemap() {
  const smStream = new SitemapStream({ hostname: 'https://www.propertyseller.ae' });
// console.log(smStream)
  // Fetch all dynamic pages like products
  const projects = await getProperties(); 
  const blogs = await getBlogs(); 
  const PropertyTypes = await fetchPropertyType(); 
    const cities = await getCities();
    
  const projectsData = projects.result
  const blogsData = blogs.result
  const propertyTypesData = PropertyTypes.result
  const citiesData = cities.result

  // Static pages
  smStream.write({ url: '/', changefreq: 'daily', priority: 0.9 });
  smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });

  // Dynamic pages
  projectsData.forEach((product) => {
    smStream.write({ url:`/property/${product.propretyHeadline.trim().toLowerCase().replace(/\s+/g, "-")}/${product._id}`, changefreq: 'weekly', priority: 0.8 });
  });

  blogsData.forEach((product) => {
    smStream.write({ url:`/blog/${product._id}/${product.blogTitle.trim().toLowerCase().replace(/\s+/g, '-')}/`, changefreq: 'weekly', priority: 0.8 });
  });

  propertyTypesData.forEach((product) => {
    smStream.write({ url:`/property-type/${product.propertyType._id}/${product.propertyType.name}`, changefreq: 'weekly', priority: 0.8 });
  });

  citiesData.forEach((product) => {
    smStream.write({ url:`/cproperty/${product._id}/${product.cityName}`, changefreq: 'weekly', priority: 0.8 });
  });


  smStream.end();

  const sitemap = await streamToPromise(smStream).then((data) => data.toString());

  // Write sitemap to file
  writeFileSync('./dist/sitemap.xml', sitemap);
}

generateSitemap();




