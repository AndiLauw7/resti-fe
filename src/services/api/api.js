// import axios from "axios";
// const API = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
// });

// API.interceptors.request.use((config) => {
//   return config;
// });

// export default API;

import axios from "axios";
// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/v1",
// });
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
});

export default API;
