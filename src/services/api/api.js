import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

API.interceptors.request.use((config) => {
  return config;
});

export default API;
