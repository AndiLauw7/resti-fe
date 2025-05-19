import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createKeranjang } from "../services/pengguna/keranjangServices";

export const KeranjangContext = createContext([]);
export const KeranjangProvider = ({ children }) => {
  const [keranjangList, setKeranjangList] = useState([]);
  const { pengguna } = useContext(AuthContext);
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
  return (
    <KeranjangContext.Provider value={{ keranjangList, tambahKeKeranjang }}>
      {children}
    </KeranjangContext.Provider>
  );
};
