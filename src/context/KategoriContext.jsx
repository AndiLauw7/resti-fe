/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import {
  createKategori,
  deleteKategori,
  getAllKategori,
  updateKategori,
} from "../services/admin/kategoriServices";

export const KategoriContext = createContext([]);
export const KategoriProvider = ({ children }) => {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", severity: "" });
  const fetchListKategori = async () => {
    try {
      const res = await getAllKategori();
      if (res?.data?.data) {
        setKategoriList(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setMessage({ text: "Gagal memuat data kategori", severity: "error" });
      return error;
    } finally {
      setLoading(false);
    }
  };

  const createDataKategori = async (data) => {
    try {
      await createKategori(data);
      await fetchListKategori();
      setMessage({
        text: "Kategori berhasil ditambahkan!",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setMessage({ text: "Gagal menambahkan kategori", severity: "error" });
      return error;
    }
  };

  const updateDataKategori = async (id, data) => {
    try {
      await updateKategori(id, data);
      await fetchListKategori();
      setMessage({
        text: "Kategori berhasil diperbarui!",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setMessage({ text: "Terjadi kesalahan, coba lagi", severity: "error" });
      return error;
    }
  };

  const deleteDataKategori = async (id) => {
    try {
      await deleteKategori(id);
      await fetchListKategori();
      setMessage({ text: "Kategori berhasil dihapus!", severity: "success" });
    } catch (error) {
      setMessage({ text: "Terjadi kesalahan, coba lagi", severity: "error" });
      return error;
    }
  };

  useEffect(() => {
    fetchListKategori();
  }, []);

  useEffect(() => {
    if (message) {
      const timeOut = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timeOut);
    }
  }, [message]);

  return (
    <KategoriContext.Provider
      value={{
        kategoriList,
        setKategoriList,
        createDataKategori,
        updateDataKategori,
        deleteDataKategori,
        loading,
        message,
      }}
    >
      {children}
    </KategoriContext.Provider>
  );
};
