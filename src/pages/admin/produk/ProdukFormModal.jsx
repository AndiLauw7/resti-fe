/* eslint-disable no-unused-vars */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { KategoriContext } from "../../../context/KategoriContext";
import { ProdukContext } from "../../../context/ProdukContext";

export const ProdukFormModal = ({ open, handleClose, dataUpdate }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
   const [keterangan, setKeterangan] = useState("");
   const [kategoriId, setKategoriId] = useState("");
   const [image, setImage] = useState(null);
   const { createDataProduk, updateDataProduk, message, loading } =
     useContext(ProdukContext);
   const { kategoriList } = useContext(KategoriContext);

   useEffect(() => {
     if (dataUpdate) {
       setNama(dataUpdate.nama || "");
       setHarga(dataUpdate.harga || "");
       setStok(dataUpdate.stok || "");
       setKeterangan(dataUpdate.keterangan || "");
       setKategoriId(dataUpdate.kategori?.id || "");
       setImage(null);
     } else {
       setNama("");
       setHarga("");
       setStok("");
       setKeterangan("");
       setKategoriId("");
       setImage(null);
     }
   }, [dataUpdate]);

   const resetForm = () => {
     setNama("");
     setHarga("");
     setStok("");
     setKeterangan("");
     setKategoriId("");
     setImage(null);
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append("nama", nama);
     formData.append("harga", harga);
     formData.append("stok", stok);
     formData.append("keterangan", keterangan);
     formData.append("kategoriId", kategoriId);
     if (image) formData.append("image", image);

     if (dataUpdate) {
       await updateDataProduk(dataUpdate.id, formData);
     } else {
       await createDataProduk(formData);
       resetForm();
     }
     handleClose();
   };

   return (
     <div>
       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
         <DialogTitle>
           {dataUpdate ? "Edit Produk" : "Tambah Produk"}
         </DialogTitle>
         <form onSubmit={handleSubmit} encType="multipart/form-data">
           <DialogContent className="flex flex-col gap-4">
             <TextField
               label="Nama Produk"
               value={nama}
               onChange={(e) => setNama(e.target.value)}
               required
               fullWidth
             />
             <TextField
               label="Harga"
               type="number"
               value={harga}
               onChange={(e) => setHarga(e.target.value)}
               required
               fullWidth
             />
             <TextField
               label="Stok"
               type="number"
               value={stok}
               onChange={(e) => setStok(e.target.value)}
               required
               fullWidth
             />
             <TextField
               label="Keterangan"
               value={keterangan}
               onChange={(e) => setKeterangan(e.target.value)}
               required
               fullWidth
             />
             <TextField
               label="Kategori"
               select
               value={kategoriId}
               onChange={(e) => setKategoriId(e.target.value)}
               required
               fullWidth
             >
               {kategoriList.map((kategori) => (
                 <MenuItem key={kategori.id} value={kategori.id}>
                   {kategori.nama}
                 </MenuItem>
               ))}
             </TextField>
             <input
               type="file"
               accept="image/*"
               onChange={(e) => setImage(e.target.files[0])}
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
