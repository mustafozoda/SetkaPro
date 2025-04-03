import axios from "axios";

// Create a new Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001", // Using VITE_API_URL from .env or default to localhost
});

// Add request interceptor to attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Generic GET request
export const getData = async (url: string) => {
  try {
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw to handle in calling function
  }
};

// Generic POST request
export const postData = async (url: string, data: any) => {
  try {
    const response = await API.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error; // Re-throw to handle in calling function
  }
};

export default API; // Export Axios instance for use in components
