/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createKeranjang,
  getKeranjangByPengguna,
} from "../services/pengguna/keranjangServices";
import { getProdukById } from "../services/admin/produkServices";

export const KeranjangContext = createContext([]);
export const KeranjangProvider = ({ children }) => {
  const [keranjangList, setKeranjangList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", severity: "" });
  const { pengguna } = useContext(AuthContext);

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
    console.log("Produk dari parameter:", produkId);

    try {
      if (!pengguna) return alert("Silakan login terlebih dahulu");
      if (quantity < 1) return alert("Jumlah minimal 1");
      const response = await createKeranjang(pengguna.id, produkId, quantity);

      const produkRes = await getProdukById(produkId);
      const produkDetail = produkRes.data.dataProduk;
      console.log("ProdukRes:", produkRes);
      console.log("Produk detail:", produkDetail);

      setKeranjangList((prev) => {
        const existing = prev.find((item) => item.produkId === produkId);
        if (existing) {
          return prev.map((item) =>
            item.produkId === produkId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // data dari be belum ada data product image
          // hasilnya = Makanya pas di KeranjangSideBar kamu render item.Produk?.image, hasilnya undefined → gambar baru muncul setelah refresh (karena fetch ulang keranjang dengan relasi Produk).
          // return [...prev, response.data.data];
          // inject manual data product image
          // return [
          //   ...prev,
          //   {
          //     ...response.data.data,
          //     Produk: produkDetail,
          //   },

          // ];
          const newItem = {
            ...response.data.data,
            Produk: produkDetail,
          };

          return [...prev, newItem];
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
        setKeranjangList,
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
