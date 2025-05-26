import API from "../api/api";

export const createTransaksi = async (payload) => {
  try {
    const response = await API.post("transaksi/create-transaksi", payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal membuat transaksi");
  }
};
