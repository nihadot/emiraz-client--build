import axios from "axios";

import {
  ADMIN,
  ADS,
  BANNER,
  BANNER_LOGO,
  BLOG,
  CITY,
  CLIENT_LOGO,
  COUNTS,
  DEVELOPER,
  DEVELOPERS,
  FORM,
  GET_ONE,
  LOGIN,
  NOT_AVAILBE,
  PRIORITY,
  PROPERTY,
  PROPERTY_TYPE,
  SEARCH,
  SIDEBAR,
  SMALL_IMAGE,
} from "./api-end-points";
import { ADMIN_TOKEN, AGENCY_TOKEN } from "./localstorage-varibles";

export const SERVER_URL = `http://localhost:4000/api/v1`;
// export const SERVER_URL = 'https://www.propertyseller.ae/api/v1';
export const MAIN_IMAG_URL = `${SERVER_URL}/mainImage`;
export const SMALL_IMAG_URL = `${SERVER_URL}/smallImage`;
// const MAIN_IMAG_URL = `${SERVER_URL}/mainImgae/`

const options = {
  Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
};

// ========ADMIN=LOGIN========//
export const adminLoginAPI = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${ADMIN}/${LOGIN}`, data);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========REMOVE=SUBIMAGE========//
export const removeSmallImageAPI = async (fileName, id) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/${PROPERTY}/${SMALL_IMAGE}/${id}`,
      { smallImage: fileName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========ADDING=PROPERTY========//
export const addingPropertyAPI = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${PROPERTY}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========ADDING=SIDBANNER========//
export const addSideBanner = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${SIDEBAR}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========FETCH=SIDBANNER========//
export const fetchSideBanners = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${SIDEBAR}/`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========FETCH=NOT AVAILBE SIDEBAR IDS========//
export const fetchNotavailbeSidebar = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${SIDEBAR}/${NOT_AVAILBE}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//

// ========FETCH=SIDBANNER========//
export const deleteSideBanners = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${SIDEBAR}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//

// ========GET=PROPERTIES========//
export const getProperties = async (query = '') => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}?${query}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========GET=PROPERTIES=BY Developers ID=======//
export const getPropertiesByDevelopers = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}/developers/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========GET=PROPERTIES=BY CITY ID=======//
export const getPropertiesByCity = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}/city/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========GET=PROPERTIES=BY=PROPERTY TYPE ID=======//
export const getPropertiesByProjectsId = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}/property-type/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=PROPERTIES=COUNTS========//
export const getPropertiesCounts = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${COUNTS}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=PROPERTY=BY=ID========//
export const getPropertyById = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=PROPERTY=========//
export const updateProperties = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${PROPERTY}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=PROPERTY=========//
export const deleteProperties = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${PROPERTY}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//

// ========ADDING=DEVELOPER=========//
export const addingDeveloper = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${DEVELOPER}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=DEVELOPERS=========//
export const getDevelopers = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${DEVELOPER}/`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=DEVELOPERS=========//
export const updateDeveloper = async (data,id) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${DEVELOPER}/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=DEVELOPERS=========//
export const deleteDeveloper = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${DEVELOPER}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//

// ========ADDING=CITY=========//
export const addingCity = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${CITY}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========ADDING=ENQUIRY=========//
export const addingEnquiry = async (data) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/${PROPERTY}/${FORM}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=ENQUIRY=STATUS========//
export const updateEnquiryStatus = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${PROPERTY}/${FORM}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========UPDATE=ENQUIRY=STATUS=AGENCY=======//
export const updateEnquiryStatusAgencyAPI = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${PROPERTY}/${FORM}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(AGENCY_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========UPDATE=ADS=STATUS========//
export const updateAdsStatusAPI = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${PROPERTY}/${ADS}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========GET=CITIES=========//
export const getCities = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${CITY}/`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========ADDING=BANNER=LOGO========//
export const addingBannerLogo = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${BANNER_LOGO}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========ADDING=CLIENT=LOGO========//
export const addingClientLogo = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${CLIENT_LOGO}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=BANNER=LOGO========//
export const getBannerLogos = async (data) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${BANNER_LOGO}/`, data);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=CLIENT=LOGO========//
export const getClientLogos = async (data) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${CLIENT_LOGO}/`, data);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=BANNER=LOGO========//
export const updateBannerLogo = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${BANNER_LOGO}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=CLIENT=LOGO========//
export const updateClientLogo = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${CLIENT_LOGO}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=BANNER=LOGO========//
export const deleteBannerLogo = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${BANNER_LOGO}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=CLIENT=LOGO========//
export const deleteClientLogo = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${CLIENT_LOGO}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=CITY========//
export const updateCity = async (data,id) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${CITY}/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=CITY========//
export const deleteCity = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${CITY}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========ADDING=BLOG========//
export const addingBlog = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${BLOG}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//

// ========GET=BLOGS========//
export const getBlogs = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${BLOG}/`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=BLOG=BYID=======//
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${BLOG}/${GET_ONE}/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=BLOG========//
export const updateBlog = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${BLOG}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=BLOG========//
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${BLOG}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========ADDING=BANNER========//
export const addingBanner = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${BANNER}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=BANNERS=BYID=======//
export const getBanners = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${BANNER}/`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=BANNER========//
export const updateBanner = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${BANNER}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=BANNER========//
export const deleteBanner = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${BANNER}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========GET=ENQUIRIES=======//
export const getEnquiries = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}/${FORM}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========GET=ENQUIRIES=BY=AGENCY=ID====//
export const getEnquiriesByAgency = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}/${FORM}/agency/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(AGENCY_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// ========ADDING=PROPERTY=TYPE========//
export const addingPropertyTypeAPI = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${PROPERTY_TYPE}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========VIEW=PROPERTY=TYPE========//
export const fetchPropertyTypeAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY_TYPE}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

export const fetchAllPropertyTypeAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY_TYPE}/get-all-properties`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========UPDATE=PROPERTY=TYPE========//
export const updatePropertyType = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${PROPERTY_TYPE}/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========DELETE=PROPERTY=TYPE========//
export const deletePropertyType = async (id) => {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/${PROPERTY_TYPE}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========FETCH=PROPERTY=COUNT========//
export const fetchPropertyTypeCountAPI = async () => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/${PROPERTY_TYPE}/${COUNTS}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========VIEW=PRIORITY========//
export const fetchPriority = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PRIORITY}/`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========VIEW=PRIORITY=DEVELOPERS=ONLY NOT AVAILES========//
export const fetchDevelopersPrioritesAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PRIORITY}/${DEVELOPERS}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========VIEW=PRIORITY=CITY=ONLY NOT AVAILES========//
export const fetchCityPrioritesAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PRIORITY}/${CITY}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


export const fetchDeveloperByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/developer/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========DELETE=SIDBANNER========//
export const deleteSideBannerUnderProperty = async (id,propertyId) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${SIDEBAR}/${id}/${propertyId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========DELETE=PRIORITY========//
export const deletePriorityByIdMatching = async (id,type) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${PRIORITY}/${id}/${type}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


// ========SEARCH=API=======//
export const searchAPI = async (query) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${PROPERTY}/${SEARCH}?q=${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

// // ========DELETE=PRIORITY========//
// export const deletePriorityAPI = async (id) => {
//   try {
//     const response = await axios.delete(`${SERVER_URL}/${PRIORITY}/${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
//     });
//     return response.data;
//   } catch (error) {
//     throw error || "An error occurred during login.";
//   }
// };

// ========ADDING=NOTIFICATION=========//
export const addingNotification = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/notification/`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========FETCH=NOTIFICATION=========//
export const fetchNotification = async (data) => {
  try {
    const response = await axios.get(`${SERVER_URL}/notification/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=NOTIFICATION=========//
export const deleteNotification = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/notification/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========FETCH=NOTIFICATION=BY=ID=======//
export const fetchNotificationByIdAPI = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/notification/get-notification/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ========UPDATE=NOTIFICATION=BY=ID=======//
export const updateNotificationByIdAPI = async (data,id) => {
  try {
    const response = await axios.put(`${SERVER_URL}/notification/update-notification/${id}`,data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};







// Agency


// ========ADDING=AGENCY========//
export const addingAgency = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/agency/create-agency`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=AGENCY========//
export const getAgency = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/agency/get-agency`,{
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========GET=AGENCY=BY=ID=======//
export const getAgencyById = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/agency/get-agency/${id}`,{
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========UPDATE=AGENCY========//
export const updateAgency = async (data,id) => {
  try {
    const response = await axios.put(`${SERVER_URL}/agency/update-agency/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};
// ==========================//
// ========DELETE=AGENCY========//
export const deleteAgency = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/agency/delete-agency/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

export const assignedToAgencyAPI = async (data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/agency/assigned-by-agency`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};



// ========AGENCY=LOGIN========//
export const agencyLoginAPI = async (data) => {
  try {
    const response = await axios.post(`${SERVER_URL}/agency/login`, data);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};




export const updateNoteForAdminEnquiry = async (id,data) => {
  try {
    const response = await axios.put(`${SERVER_URL}/${PROPERTY}/enq-change-note/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

export const updateToggleLock = async (status,id) => {
  try {
    console.log(status,id)
    const response = await axios.put(`${SERVER_URL}/${PROPERTY}/enq-toggle-lock/${status}/${id}`,{}, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


export const updateToggleLockAgency = async (status,id) => {
  try {
    console.log(status,id)
    const response = await axios.put(`${SERVER_URL}/${PROPERTY}/enq-toggle-lock/${status}/${id}`,{}, {
      headers: { Authorization: `Bearer ${localStorage.getItem(AGENCY_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


