import { useMemo } from "react";
import dayjs from "dayjs";
export const useColumns = (handleDetail, handleDelete) => {
  const columns = useMemo(
    () => [
      {
        header: "Aksi",
        size: 5,
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleDetail(row.original.id)}
            >
              Detail
            </button>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(row.original.id)}
            >
              Hapus
            </button>
          </div>
        ),
      },
      {
        header: "No",
        Cell: (info) => info.row.index + 1,
        grow: true,
        size: 10,
      },
      {
        accessorKey: "Pengguna.nama",
        header: "Nama Customer",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "Pengguna.email",
        header: "Nama Kategori",
        grow: true,
        size: 10,
      },

      {
        // accessorKey: "paymentMethod",
        header: "Pembayaran",
        grow: true,
        size: 10,
        accessorFn: (row) =>
          row.paymentMethod?.toUpperCase() ?? "Belum Melakukan Transaksi",
      },
      {
        accessorKey: "status",
        header: "StatusPembayaran",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "tanggal",
        cell: ({ getValue }) => dayjs(getValue()).format("DD-MM-YYYY HH:mm"),
        header: "Tanggal Transaksi",
        grow: true,
        size: 10,
      },
      {
        header: "Nama Produk",
        accessorFn: (row) => row.TransaksiItems?.[0]?.Produk?.nama ?? "-",
        grow: true,
        size: 10,
      },
      {
        header: "Quantity",
        accessorFn: (row) => row.TransaksiItems?.[0]?.quantity ?? "-",
        grow: true,
        size: 10,
      },
      {
        header: "Subtotal",
        accessorFn: (row) => row.TransaksiItems?.[0]?.subtotal ?? "-",
        grow: true,
        size: 10,
      },
    ],
    [handleDetail, handleDelete]
  );
  return columns;
};
