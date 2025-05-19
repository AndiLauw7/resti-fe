// src/services/authService.js

import API from "./api/api";

export const registerPengguna = (data) => API.post("/register", data);
export const loginPengguna = (data) => API.post("/login", data);
export const getPenggunaById = (id, token) =>
  API.get(`/pengguna/get-pengguna-byid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
