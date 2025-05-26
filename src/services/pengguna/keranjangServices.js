import API from "../api/api";

export const createKeranjang = async (penggunaId, produkId, quantity = 1) => {
  return await API.post("/keranjang/create-keranjang", {
    penggunaId,
    produkId: produkId,
    quantity,
  });
};

export const getKeranjangByPengguna = async (penggunaId) => {
  try {
    const response = await API.get(`/keranjang/get-keranjang/${penggunaId}`);
    console.log(response);

    return response.data.data;
  } catch (error) {
    throw new Error(error, "Error fetching keranjang data");
  }
};