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

  export const fetchDevelopers = async () => {
    try {
      const response = await axios.get(`https://www.propertyseller.ae/api/v1/developer`);
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
  const allDevelopers = await fetchDevelopers(); 
    const cities = await getCities();
    
  const projectsData = projects.result
  const blogsData = blogs.result
  const allDevelopersData = allDevelopers.result
  const citiesData = cities.result

  // Static pages
  smStream.write({ url: '/', changefreq: 'daily', priority: 0.9 });
  smStream.write({ url: '/about', changefreq: 'monthly', priority: 0.7 });
 
  smStream.write({ url: '/property-type/apartment', changefreq: 'monthly', priority: 0.7 });
  smStream.write({ url: '/property-type/villa/', changefreq: 'monthly', priority: 0.7 });
  smStream.write({ url: '/property-type/townhouse/', changefreq: 'monthly', priority: 0.7 });
  smStream.write({ url: '/property-type/penthouse/', changefreq: 'monthly', priority: 0.7 });

  smStream.write({ url: '/our-developers', changefreq: 'monthly', priority: 0.7 });

  // Dynamic pages
  projectsData.forEach((product) => {
    smStream.write({ url:`/property/${product.slug}`, changefreq: 'weekly', priority: 0.8 });
  });

  blogsData.forEach((product) => {
    smStream.write({ url:`/blog/${product.slug}/`, changefreq: 'weekly', priority: 0.8 });
  });

  allDevelopersData.forEach((product) => {
    smStream.write({ url:`/developers/${product.slug}`, changefreq: 'weekly', priority: 0.8 });
  });

  citiesData.forEach((product) => {
    smStream.write({ url:`/city/property/${product.slug}`, changefreq: 'weekly', priority: 0.8 });
  });


  smStream.end();

  const sitemap = await streamToPromise(smStream).then((data) => data.toString());

  // Write sitemap to file
  writeFileSync('./public/sitemap.xml', sitemap);
}

generateSitemap();




