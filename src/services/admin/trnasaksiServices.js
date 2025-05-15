import API from "../api/api";


export const getTransaksiById = (id) =>
  API.get(`/transaksi/get-transaksi/${id}`);
export const deleteTransaksi = (id) =>
  API.delete(`/transaksi/delete-transaksi/${id}`);
export const getLaporanTransaksi = (startDate, endDate) =>
  API.get(`/transaksi/get-laporan-transaksi`, {
    params: { startDate, endDate },
  });
export const cetakLaporanTransaksi = (startDate, endDate) =>
  API.get(`/transaksi/cetak-laporan-transaksi`, {
    params: { startDate, endDate },
  });
