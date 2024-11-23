import axios from "axios";
import { SERVER_URL } from "../../api";
import { ADMIN_TOKEN } from "../../api/localstorage-varibles";

export const fetchProjectUsedPriorityCount = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/project/used-priority-counts`,{
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
  };

  export const addingProject = async (data) => {
    try {
      const response = await axios.post(`${SERVER_URL}/project/add-project`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
      });
      return response.data;
    } catch (error) {
      throw error || "An error occurred during login.";
    }
};



// fetch projects only priority
export const fetchAllPriorityProjectsAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/priority/projects/fetch-all`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};




// projects fetch only
export const fetchAllProjectsAPI = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/project/fetch-all`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


// delete project
export const deleteProjectById = async (id) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/project/delete-project/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


export const fetchProjectById = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL}/project/fetch-project/${id}`);
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};

export const editProjectById = async (data,id) => {
  try {
    const response = await axios.put(`${SERVER_URL}/project/edit-project/${id}`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};



export const deleteCityFromProjectById = async (cityId,projectId) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/project/delete-city-from-project/${cityId}/${projectId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};


export const deleteProjectTypeFromProjectById = async (projectType,projectId) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/project/delete-project-type-from-project/${projectType}/${projectId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};



export const deleteProjectImage = async (image,projectId) => {
  try {
    const response = await axios.post(`${SERVER_URL}/project/delete-img-from-project/${projectId}`, {imageName:image},{
      headers: { Authorization: `Bearer ${localStorage.getItem(ADMIN_TOKEN)}` },
    });
    return response.data;
  } catch (error) {
    throw error || "An error occurred during login.";
  }
};



