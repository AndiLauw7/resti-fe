/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createKeranjang,
  getKeranjangByPengguna,
} from "../services/pengguna/keranjangServices";

export const KeranjangContext = createContext([]);
export const KeranjangProvider = ({ children }) => {
  const [keranjangList, setKeranjangList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", severity: "" });
  const { pengguna } = useContext(AuthContext);
  // const [keranjangOpen, setKeranjangOpen] = useState(false);

  // const toggleSideBar = () => {
  //   setKeranjangOpen((prev) => !prev);
  // };
  const fetchDataKeranjang = async () => {
    if (!pengguna) return;
    setLoading(true);

    try {
      const data = await getKeranjangByPengguna(pengguna.id);
      setKeranjangList(data);
      setMessage({
        text: "Keranjang berhasil dimuat!",
        severity: "success",
      });
    } catch (error) {
      setMessage({
        text: "Gagal memuat keranjang",
        severity: "error",
      });
    }
  };

  const tambahKeKeranjang = async (produkId, quantity = 1) => {
    try {
      if (!pengguna) return alert("Silakan login terlebih dahulu");
      if (quantity < 1) return alert("Jumlah minimal 1");
      const response = await createKeranjang(pengguna.id, produkId, quantity);
      setKeranjangList((prev) => {
        const existing = prev.find((item) => item.produkId === produkId);
        if (existing) {
          return prev.map((item) =>
            item.produkId === produkId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, response.data.data];
        }
      });
    } catch (error) {
      console.error(
        "Gagal tambah ke keranjang:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Gagal menambahkan ke keranjang");
    }
  };

  useEffect(() => {
    if (pengguna?.id) {
      fetchDataKeranjang();
    }
  }, [pengguna]);

  return (
    <KeranjangContext.Provider
      value={{
        keranjangList,
        tambahKeKeranjang,
        message,
        loading,
        // keranjangOpen,
        // toggleSideBar,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
};
