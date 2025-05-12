import API from "../api/api";

export const getAllKategori = () => API.get(`/kategori/get-kategori-all`);
export const getKategoriById = (id) =>
  API.get(`/kategori/get-kategori-byid/${id}`);
export const createKategori = (data) =>
  API.post(`/kategori/create-kategori/`, data);
export const updateKategori = (id, data) =>
  API.put(`/kategori/update-kategori-byid/${id}`, data);
export const deleteKategori = (id) =>
  API.delete(`/kategori/delete-kategori-byid/${id}`);
