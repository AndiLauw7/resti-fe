/* eslint-disable no-unused-vars */
import { useState } from "react";
import { KategoriTable } from "./KategoriTable";
import { Button } from "@mui/material";
import { KategoriFormModal } from "./KategoriFormModal";
export const KategoriPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpenModal = (data = null) => {
    setEditData(data);
    setOpenModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">Manajemen Kategori</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          Tambah Kategori
        </Button>
      </div>
      <KategoriTable onEdit={handleOpenModal} />
      <KategoriFormModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        dataUpdate={editData}
      />
    </div>
  );
};
