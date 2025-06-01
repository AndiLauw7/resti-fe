import API from "../api/api";

export const createTransaksi = async (payload) => {
  try {
    const response = await API.post("transaksi/create-transaksi", payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal membuat transaksi");
  }
};
export const getTransaksiByUserId = async (userId, token) => {
  try {
    const response = await API.get(`/transaksi/get-transaksi-user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Gagal menampilkan transaksi"
    );
  }
};