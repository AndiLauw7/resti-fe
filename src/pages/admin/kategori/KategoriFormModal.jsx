/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { KategoriContext } from "../../../context/KategoriContext";

export const KategoriFormModal = ({ open, handleClose, dataUpdate }) => {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const { createDataKategori, updateDataKategori, message, loading } =
    useContext(KategoriContext);

  useEffect(() => {
    if (dataUpdate) {
      setNama(dataUpdate.nama || "");
      setDeskripsi(dataUpdate.deskripsi || "");
    } else {
      setNama("");
      setDeskripsi("");
    }
  }, [dataUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nama, deskripsi };
    if (dataUpdate) {
      await updateDataKategori(dataUpdate.id, payload);
    } else {
      await createDataKategori(payload);
    }
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {dataUpdate ? "Edit Kategori" : "Tambah Kategori"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent className="flex flex-col gap-4">
            <TextField
              label="Nama Kategori"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Batal</Button>
            <Button type="submit" variant="contained">
              {dataUpdate ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
