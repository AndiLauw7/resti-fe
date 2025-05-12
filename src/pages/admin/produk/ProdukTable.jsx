import { Alert, Snackbar } from "@mui/material";
import TableCustom from "../../../components/table/TableCustom";
import { useContext } from "react";
import { ProdukContext } from "../../../context/ProdukContext";
import { useColumns } from "./ColumnsProduk";

export const ProdukTable = ({ onEdit }) => {
  const { produkList, deleteDataProduk, message } = useContext(ProdukContext);

  const handleDelete = async (id) => {
    await deleteDataProduk(id);
  };
  const handleEdit = (id) => {
    const produk = produkList.find((produk) => produk.id === id);
    onEdit(produk);
  };
  const columns = useColumns(handleEdit, handleDelete);
  return (
    <div>
      <TableCustom data={produkList} columns={columns} />
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
