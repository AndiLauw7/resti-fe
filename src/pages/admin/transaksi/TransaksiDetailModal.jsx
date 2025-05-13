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
      <DialogTitle>Detail Transaksi</DialogTitle>
      <DialogContent>
        <div className="space-y-2">
          <p>
            <strong>Tanggal:</strong>{" "}
            {new Date(transaksi.tanggal).toLocaleString()}
          </p>
          <p>
            <strong>Nama Pengguna:</strong> {transaksi.Pengguna?.nama}
          </p>
          <p>
            <strong>Total:</strong> Rp {transaksi.total.toLocaleString("id-ID")}
          </p>
          <p className="mt-4 font-semibold">Item Transaksi:</p>
          <ul className="list-disc list-inside">
            {transaksi.TransaksiItems.map((item) => (
              <li key={item.id}>
                {item.Produk?.nama} - {item.quantity} x Rp{" "}
                {item.subtotal.toLocaleString("id-ID")}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  );
};
