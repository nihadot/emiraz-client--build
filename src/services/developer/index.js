import axios from "axios";
import { SERVER_URL } from "../../api";
import { ADMIN_TOKEN } from "../../api/localstorage-varibles";

export const fetchDeveloperUsedPriorityCount = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/developer/used-priority-counts`,{
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };

  export const addingDeveloper = async (data) => {
    try {
      const response = await axios.post(`${SERVER_URL}/developer/add-developer`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
};



// fetch developers only priority
export const fetchAllPriorityDevelopersAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/priority/developers/fetch-all`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};




// cities fetch only
export const fetchAllDevelopersAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/developer/fetch-all`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


// delete developer
export const deleteDeveloperById = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/developer/delete-developer/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


export const fetchDeveloperById = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/developer/fetch-developer/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

export const editDeveloperById = async (data,id) => {
  try {
    const response = await axios.put(`${SERVER_URL}/developer/edit-developer/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

  // developers both type developers 
  export const fetchBothTypeDevelopersAPI = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/developer/fetch-both`);
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };