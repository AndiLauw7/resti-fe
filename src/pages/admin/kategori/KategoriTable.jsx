/* eslint-disable no-unused-vars */
import { useContext } from "react";
import TableCustom from "../../../components/table/TableCustom";
import { KategoriContext } from "../../../context/KategoriContext";
import { useColumns } from "./ColumnsKategori";
import { Alert, Snackbar } from "@mui/material";

export const KategoriTable = ({ onEdit }) => {
  const { kategoriList, deleteDataKategori, message } =
    useContext(KategoriContext);

  const handleDelete = async (id) => {
    await deleteDataKategori(id);
  };
  const handleEdit = (id) => {
    const kategori = kategoriList.find((kategori) => kategori.id === id);
    onEdit(kategori);
  };
  const columns = useColumns(handleEdit, handleDelete);
  return (
    <div>
      <TableCustom data={kategoriList} columns={columns} />
      {message.text && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => {}}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={message.severity} sx={{ width: "100%" }}>
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};
