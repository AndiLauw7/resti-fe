// src/services/authService.js
import API from "./api";

export const registerAdmin = (data) => API.post("/admin/register", data);
export const loginAdmin = (data) => API.post("/admin/login", data);

export const registerAnggota = (data) => API.post("/anggota/register", data);
export const loginAnggota = (data) => API.post("/anggota/login", data);

export const adminAddAnggota = (data, token) =>
  API.post("/admin/addAnggota", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAdminData = (token) =>
  API.get("/admin/data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAnggotaData = (token) =>
  API.get("/anggota/data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
