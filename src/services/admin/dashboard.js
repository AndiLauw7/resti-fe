import API from "../api/api";

export const getAllKategori = () => API.get("/kategori/get-kategori-all");
export const getAllProduk = () => API.get("/produk/get-produk-all");
export const getAllTransaksi = () => API.get("/transaksi/get-transaksi");
