import { useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
export const useColumns = (handleDetail, handleDelete) => {
  dayjs.locale("id");
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };
  const columns = useMemo(
    () => [
      {
        header: "Aksi",
        size: 5,
        Cell: ({ row }) => {
          return (
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
          );
        },
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
        accessorFn: (row) =>
          dayjs(row.tanggal).locale("id").format("DD MMMM YYYY"),
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
        accessorFn: (row) =>
          formatRupiah(row.TransaksiItems?.[0]?.subtotal ?? 0),
        grow: true,
        size: 10,
      },
    ],
    [handleDetail, handleDelete]
  );
  return columns;
};
