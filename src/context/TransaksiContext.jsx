/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteTransaksi,
  getLaporanTransaksi,
  getTransaksiById,
} from "../services/admin/trnasaksiServices";
import { AuthContext } from "./AuthContext";
import { getTransaksiByUserId } from "../services/pengguna/transaksiService";

export const TransaksiContext = createContext([]);

export const TransaksiProvider = ({ children }) => {
  const [transaksiList, setTransaksiList] = useState([]);
  const [transaksiUser, setTransaksiUser] = useState([]);

  const [selectedTransaksi, setSelectedTransaksi] = useState(null);
  console.log(selectedTransaksi);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", severity: "" });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchTransaksiData = async (startDate, endDate) => {
    try {
      const res = await getLaporanTransaksi(startDate, endDate);

      setTransaksiList(res.data.data);
    } catch (error) {
      setMessage({
        text: "Gagal mengambil data transaksi",
        severity: "error",
      });
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
      setMessage({
        text: "Transaksi berhasil dihapus",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Gagal menghapus transaksi", severity: "error" });
    }
  };

  useEffect(() => {
    fetchTransaksiData();
  }, []);

  const fetchTransaksiUserId = async (id, token) => {
    try {
      if (id && token) {
        const res = await getTransaksiByUserId(id, token);

        setTransaksiUser(res.data.data);
      }
    } catch (error) {
      console.error("Gagal ambil transaksi:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    const payload = JSON.parse(atob(token.split(".")[1]));
    fetchTransaksiUserId(payload.id, token);
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
        fetchTransaksiUserId,
        removeTransaksi,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        setTransaksiUser,
        transaksiUser,
      }}
    >
      {children}
    </TransaksiContext.Provider>
  );
};
