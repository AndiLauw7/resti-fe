/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createProduk,
  deleteProduk,
  getAllProduk,
  updateProduk,
} from "../services/admin/produkServices";
import {
  getAllKategori,
  getKategoriById,
} from "../services/admin/kategoriServices";
import { KategoriContext } from "./KategoriContext";

export const ProdukContext = createContext([]);

export const ProdukProvider = ({ children }) => {
  const [produkList, setProdukList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", severity: "" });
  const { kategoriList, setKategoriList } = useContext(KategoriContext);
  const fetchDataProduk = async () => {
    try {
      const res = await getAllProduk();
      const dataKategori = await getAllKategori();

      setKategoriList(dataKategori.data.data);

      if (res?.data?.dataProduk) {
        setProdukList(res.data.dataProduk);
      }
    } catch (error) {
      console.log(error);
      setMessage({ text: "Gagal memuat data produk", severity: "error" });
      return error;
    }
  };

  const createDataProduk = async (data) => {
    try {
      await createProduk(data);
      await fetchDataProduk();
      setMessage({ text: "Produk berhasil ditambahkan!", severity: "success" });
    } catch (error) {
      console.log(error);
      setMessage({ text: "Gagal menambahkan produk", severity: "error" });
      return error;
    }
  };

  const updateDataProduk = async (id, data) => {
    try {
      await updateProduk(id, data);
      await fetchDataProduk();
      setMessage({ text: "Produk berhasil diperbarui!", severity: "success" });
    } catch (error) {
      console.log(error);
      setMessage({ text: "Gagal memperbarui produk", severity: "error" });
      return error;
    }
  };

  const deleteDataProduk = async (id) => {
    try {
      await deleteProduk(id);
      await fetchDataProduk();
      setMessage({ text: "Produk berhasil dihapus!", severity: "success" });
    } catch (error) {
      setMessage({ text: "Terjadi kesalahan, coba lagi", severity: "error" });
      return error;
    }
  };

  useEffect(() => {
    fetchDataProduk();
  }, []);
  return (
    <ProdukContext.Provider
      value={{
        produkList,
        loading,
        message,
        createDataProduk,
        updateDataProduk,
        deleteDataProduk,
      }}
    >
      {children}
    </ProdukContext.Provider>
  );
};
