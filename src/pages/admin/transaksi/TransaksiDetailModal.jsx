import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export const TransaksiDetailModal = ({ open, handleClose, transaksi }) => {

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent className="p-6 space-y-4 text-gray-800">
        <h2 className="text-xl font-bold text-gray-900 border-b pb-2">
          Detail Transaksi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Tanggal</p>
            <p className="font-semibold">
              {new Date(transaksi.tanggal).toLocaleString()}
            </p>
          </div>

          {transaksi?.Pengguna?.nama && (
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Nama Pengguna</p>
              <p className="font-semibold">{transaksi.Pengguna.nama}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Item Transaksi
            </p>
            <ul className="space-y-2">
              {transaksi.TransaksiItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between bg-white p-3 rounded-lg shadow-sm border"
                >
                  <span>
                    {item.Produk?.nama}{" "}
                    <span className="text-gray-500">x{item.quantity}</span>
                  </span>

                  <span className="font-semibold">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl shadow-sm col-span-1 md:col-span-2">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-lg font-bold text-green-600">
              Ongkir Rp {transaksi.ongkir.toLocaleString("id-ID")}
            </p>
            <p className="text-lg font-bold text-green-600">
              Total Harga Rp {transaksi.total.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-200">
          <p className="text-sm text-gray-500">Alamat Pengiriman</p>
          <p className="font-semibold">{transaksi?.alamat_kirim}</p>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  );
};
