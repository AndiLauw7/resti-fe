import { useContext, useState } from "react";
import { KeranjangContext } from "../../../context/KeranjangContext";
import { X } from "lucide-react";
import axios from "axios";

const KeranjangSideBar = () => {
  const { keranjangList, keranjangOpen, toggleSideBar, fetchDataKeranjang } =
    useContext(KeranjangContext);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const BASE_URL_API = import.meta.env.VITE_APP_API_BASE_URL;

  const [selectItems, setSelectItems] = useState([]);
  const handleCheck = (itemId) => {
    setSelectItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
  const handleCheckout = async () => {
    const itemsToCheckout = keranjangList
      .filter((item) => selectItems.includes(item.id))
      .map((item) => ({
        keranjangId: item.id,
        produkId: item.produkId,
        quantity: item.quantity,
      }));

    if (itemsToCheckout.length === 0) {
      alert("Pilih minimal satu item");
      return;
    }
    try {
      const penggunaId = keranjangList[0]?.penggunaId;
      const tanggal = new Date().toISOString().split("T")[0];
      const transaksiResponse = await axios.post(
        `${BASE_URL_API}/transaksi/create-transaksi`,
        {
          penggunaId,
          tanggal,
          items: itemsToCheckout,
        }
      );
      const transaksiId = transaksiResponse.data.data.id;
      const paymentResponse = await axios.post(
        `${BASE_URL_API}/payment/midtrans/create-payment`,
        {
          transaksiId,
        }
      );
      const redirectUrl = paymentResponse.data.redirectUrl;
      window.open(redirectUrl, "_blank");
      //  location.href = redirectUrl;
      alert("Checkout berhasil!");
      // TODO: Optional: refresh keranjangList dari context
      // await fetchDataKeranjang(penggunaId);
    } catch (error) {
      alert(
        "Gagal checkout: " + error.response?.data?.message || error.message
      );
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        keranjangOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Keranjang</h2>
        <button onClick={toggleSideBar}>
          <X />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)] space-y-4">
        {keranjangList.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          keranjangList.map((item) => {
            const image = item.Produk.image;
            const src = image
              ? `${BASE_URL}${
                  image.startsWith("/uploads/") ? "" : "/uploads/"
                }${image}`
              : "fallback.jpg";
            return (
              <div
                key={item.id}
                className="flex items-start gap-4 border-b pb-4"
              >
                <input
                  type="checkbox"
                  className="mt-2"
                  checked={selectItems.includes(item.id)}
                  onChange={() => handleCheck(item.id)}
                />
                <img
                  src={src}
                  alt={item.Produk.nama}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.Produk.nama}</p>
                  <p className="text-sm text-gray-600">
                    Jumlah: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    Total: Rp{" "}
                    {parseInt(item.totalHarga).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t">
        <button
          onClick={handleCheckout}
          className={`w-full py-2 rounded bg-blue-600 text-white font-semibold ${
            selectItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={selectItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default KeranjangSideBar;
