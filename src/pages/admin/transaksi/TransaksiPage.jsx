/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { TransaksiTable } from "./TransaksiTable";
import { TransaksiContext } from "../../../context/TransaksiContext";
import { TransaksiDetailModal } from "./TransaksiDetailModal";

export const TransaksiPage = () => {
  const {
    transaksiList,
    setTransaksiList,
    selectedTransaksi,
    setSelectedTransaksi,
    fetchTransaksiById,
    removeTransaksi,
  } = useContext(TransaksiContext);
  const [openDetail, setOpenDetail] = useState(false);

  const handleDetail = async (id) => {
    // const kategori = kategoriList.find((kategori) => kategori.id === id);
    // onEdit(kategori);
    await fetchTransaksiById(id);
    // setSelectedTransaksi(id);
    setOpenDetail(true);
  };
  const handleDelete = async (id) => {
    // Implementasi hapus transaksi bisa pakai confirm dialog, dll.
    await removeTransaksi(id);
  };

  const handleClose = () => {
    setOpenDetail(false);
    setSelectedTransaksi(null);
  };
  return (
    <div className="p-6" style={{ height: "90vh", overflow: "hidden" }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Transaksi</h1>
        <Button variant="contained" color="primary">
          Cetak Transaksi
        </Button>
      </div>
      <div style={{ height: "75vh", overflow: "auto" }}>
        <TransaksiTable
          transaksiList={transaksiList}
          handleDetail={handleDetail}
          handleDelete={handleDelete}
        />
      </div>
      {selectedTransaksi && (
        <TransaksiDetailModal
          open={openDetail}
          handleClose={handleClose}
          transaksi={selectedTransaksi}
        />
      )}
    </div>
  );
};
