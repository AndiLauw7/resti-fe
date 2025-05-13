/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import {
  deleteTransaksi,
  getLaporanTransaksi,
  getTransaksiById,
} from "../services/admin/trnasaksiServices";

export const TransaksiContext = createContext([]);

export const TransaksiProvider = ({ children }) => {
  const [transaksiList, setTransaksiList] = useState([]);
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", severity: "" });
  const fetchTransaksiData = async () => {
    try {
      const res = await getLaporanTransaksi();
      console.log(res.data.data);
      setTransaksiList(res.data.data);
    } catch (error) {
      console.log(error);
      setMessage({ text: "Gagal mengambil data transaksi", severity: "error" });
      return error;
    } finally {
      setLoading(false);
    }
  };
  const fetchTransaksiById = async (id) => {
    try {
      const res = await getTransaksiById(id);
      setSelectedTransaksi(res.data.data);
    } catch (error) {
      console.error(error);
      setMessage({
        text: "Gagal mengambil detail transaksi",
        severity: "error",
      });
    }
  };

  const removeTransaksi = async (id) => {
    try {
      await deleteTransaksi(id);
      await fetchTransaksiData();
      setMessage({ text: "Transaksi berhasil dihapus", severity: "success" });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Gagal menghapus transaksi", severity: "error" });
    }
  };
  useEffect(() => {
    fetchTransaksiData();
  }, []);
  return (
    <TransaksiContext.Provider
      value={{
        transaksiList,
        setTransaksiList,
        selectedTransaksi,
        setSelectedTransaksi,
        loading,
        setLoading,
        message,
        setMessage,
        fetchTransaksiData,
        fetchTransaksiById,
        removeTransaksi,
      }}
    >
      {children}
    </TransaksiContext.Provider>
  );
};
