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
        header: "Nama Kategori",
        grow: true,
        size: 10,
      },
      {
        accessorKey: "deskripsi",
        header: "Deskripsi",
        grow: true,
        size: 10,
      },
    ],
    [handleEdit, handleDelete]
  );
  return columns;
};
