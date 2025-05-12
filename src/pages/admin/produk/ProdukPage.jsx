/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import { useState } from "react";
import { ProdukTable } from "./ProdukTable";
import { ProdukFormModal } from "./ProdukFormModal";

export const ProdukPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const handleOpenModal = (data = null) => {
    setEditData(data);
    setOpenModal(true);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manajemen Produk</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          Tambah Produk
        </Button>
      </div>
      <ProdukTable onEdit={handleOpenModal} />
      <ProdukFormModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        dataUpdate={editData}
      />
    </div>
  );
};
