import API from "../api/api";

export const getAllProduk = () => API.get(`/produk/get-produk-all`);
export const getProdukById = (id) => API.get(`/produk/get-produk-byId/${id}`);


export const createProduk = (data) => API.post(`/produk/create-produk/`, data);
export const updateProduk = (id, data) =>
  API.put(`/produk/update-produk-byid/${id}`, data);
export const deleteProduk = (id) =>
  API.delete(`/produk/delete-produk-byid/${id}`);
