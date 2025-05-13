import { useMemo } from "react";

export const useColumns = (handleEdit, handleDelete) => {
  const columns = useMemo(
    () => [
      {
        header: "Aksi",
        size: 5,
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleEdit(row.original.id)}
            >
              Edit
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
        accessorKey: "nama",
        header: "Nama Produk",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "Kategori.nama",
        header: "Nama Kategori",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "harga",
        header: "Harga",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "stok",
        header: "Stok",
        grow: true,
        size: 10,
      },
      {
        header: "Gambar Produk",
        accessorFn: (row) => row.original?.image,
        Cell: ({ row }) => {
          const image = row.original.image;
          const src = image
            ? `http://localhost:5000${
                image.startsWith("/uploads/") ? "" : "/uploads/"
              }${image}`
            : "https://via.placeholder.com/64";

          return (
            <img
              src={src}
              alt={row.original.nama || "Gambar Produk"}
              className="w-16 h-16 object-cover rounded"
            />
          );
        },
        grow: true,
        size: 10,
      },
    ],
    [handleEdit, handleDelete]
  );
  return columns;
};
