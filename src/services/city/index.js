import axios from "axios";
import { SERVER_URL } from "../../api";
import { ADMIN_TOKEN } from "../../api/localstorage-varibles";

export const addingCity = async (data) => {
    try {
      const response = await axios.post(`${SERVER_URL}/city/add-city`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
};



// fetch cities only priority
export const fetchAllPriorityCitiesAPI = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/priority/cities/fetch-all`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };


// cities fetch only
  export const fetchAllCitiesAPI = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/city/fetch-all`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };

// delete city
  export const deleteCityById = async (id) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/city/delete-city/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };


  export const removeCityPriorityById = async (id,type) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/priority/delete-priority/${id}/${type}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };


  export const fetchCityById = async (id) => {
    try {
      const response = await axios.get(`${SERVER_URL}/city/fetch-city/${id}`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };



  export const fetchCityUsedPriorityCount = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/city/used-priority-counts`,{
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };



  export const editCityById = async (data,id) => {
    try {
      const response = await axios.put(`${SERVER_URL}/city/edit-city/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };



  // cities both type cities 
  export const fetchBothTypeCitiesAPI = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/city/fetch-both`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };