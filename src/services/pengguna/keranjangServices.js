import API from "../api/api";

export const createKeranjang = async (penggunaId, produkId, quantity = 1) => {
  return await API.post("/keranjang/create-keranjang", {
    penggunaId,
    produkId: produkId,
    quantity,
  });
};
