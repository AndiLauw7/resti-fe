/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import AdminLayouts from "../../layouts/adminLayouts/AdminLayouts.jsx";
import StatCard from "../../components/card/StatCard";
import {
  getAllKategori,
  getAllProduk,
  getAllTransaksi,
} from "../../services/admin/dashboard.js";
import TransaksiChart from "../../components/transaksi-charts/TransaksiCharts.jsx";

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
  const chartData = [
    { status: "Sukses", jumlah: transaksiSucces },
    { status: "Batal", jumlah: trnasaksiBatal },
  ];

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <StatCard title="Total Kategori" value={kategori.length} />
        <StatCard title="Total Produk" value={produk.length} />
        <StatCard title="Total Transaksi" value={transaksi.length} />
        <StatCard title="Transaksi Sukses" value={transaksiSucces} />
        <StatCard title="Transaksi Batal" value={trnasaksiBatal} />
      </div>
      <TransaksiChart data={chartData} />
    </div>
  );
};

export default Dashboard;
