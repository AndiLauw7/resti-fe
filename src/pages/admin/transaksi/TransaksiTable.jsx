/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import TableCustom from "../../../components/table/TableCustom";
import { useColumns } from "./ColumnsTransaksi";
import { TransaksiContext } from "../../../context/TransaksiContext";

export const TransaksiTable = ({
  handleDetail,
  handleDelete,
  transaksiList,
}) => {
  const columns = useColumns(handleDetail, handleDelete);

  return <TableCustom data={transaksiList} columns={columns} />;
};
