/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts.jsx";
import StatCard from "../../components/card/StatCard";
import {
  getAllKategori,
  getAllProduk,
  getAllTransaksi,
} from "../../services/admin/dashboard.js";

const Dashboard = () => {
  const [produk, setProduk] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    getAllKategori()
      .then((res) => {
        if (res?.data?.data) {
          setKategori(res.data.data);
        } else {
          return;
        }
      })
      .catch((err) => console.log("Error fetching buku data:", err));
    getAllProduk()
      .then((res) => {
        setProduk(res.data.dataProduk || []);
      })
      .catch((err) => console.error(err));
    getAllTransaksi()
      .then((res) => {
        setTransaksi(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const trnasaksiBatal = transaksi.filter((p) => p.status === "failed").length;
  const transaksiSucces = transaksi.filter((p) => p.status === "paid").length;
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Kategori"
          value={kategori ? kategori.length : 0}
          color="border-yellow-500"
        />

        <StatCard
          title="Total Produk"
          value={produk && Array.isArray(produk) ? produk.length : 0}
          color="border-blue-500"
        />

        <StatCard
          title="Total Transaksi"
          value={transaksi ? transaksi.length : 0}
          color="border-green-500"
        />
        <StatCard
          title="Transaksi Sukses"
          value={transaksiSucces}
          color="border-green-500"
        />
        <StatCard
          title="Transaksi Batal"
          value={trnasaksiBatal}
          color="border-red-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;
