import { useContext, useEffect, useState } from "react";
import { KeranjangContext } from "../../../context/KeranjangContext";
import { X } from "lucide-react";
import axios from "axios";
import { SideBarContext } from "../../../context/SideBarContext";
import { AuthContext } from "../../../context/AuthContext";

const KeranjangSideBar = () => {
  const { keranjangList, setKeranjangList } = useContext(KeranjangContext);
  const { pengguna } = useContext(AuthContext);
  const { activeSidebar, closeSidebar } = useContext(SideBarContext);
  const [alamat_kirim, setAlamatKirim] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const BASE_URL_API = import.meta.env.VITE_APP_API_BASE_URL;

  const [selectItems, setSelectItems] = useState([]);
  useEffect(() => {
    if (pengguna?.alamat) {
      setAlamatKirim(pengguna.alamat);
    }
  }, [pengguna]);
  const handleCheck = (itemId) => {
    setSelectItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
  const handleCheckout = async () => {
    if (!alamat_kirim) {
      alert("Alamat kirim wajib diisi!");
      return;
    }
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
          alamat_kirim,
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

      alert("Checkout berhasil!");
    } catch (error) {
      alert(
        "Gagal checkout: " + error.response?.data?.message || error.message
      );
    }
  };

  const deleteItemsKeranjang = async (id) => {
    try {
      await axios.delete(`${BASE_URL_API}/keranjang/delete-keranjang/${id}`);
      setKeranjangList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(
        "Gagal menghapus item: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        activeSidebar === "cart" ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Keranjang</h2>
        <button onClick={closeSidebar}>
          <X />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-160px)] space-y-4">
        {keranjangList.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          keranjangList.map((item) => {
            // const image = item.Produk?.image;

            // const src = image
            //   ? `${BASE_URL}${
            //       image.startsWith("/uploads/") ? "" : "/uploads/"
            //     }${image}`
            //   : "fallback.jpg";
            return (
              <div
                key={item.id}
                className="relative  flex items-start gap-4 border-b pb-4"
              >
                <input
                  type="checkbox"
                  className="mt-2"
                  checked={selectItems.includes(item.id)}
                  onChange={() => handleCheck(item.id)}
                />
                {/* <img
                  src={src}
                  alt={item.Produk?.nama}
                  className="w-16 h-16 object-cover rounded"
                /> */}
                <img
                  src={
                    item.Produk?.image
                      ? `${BASE_URL}${
                          item.Produk.image.startsWith("/uploads/")
                            ? ""
                            : "/uploads/"
                        }${item.Produk.image}`
                      : "/placeholder.png"
                  }
                  alt={item.Produk?.nama || "Produk"}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.Produk?.nama}</p>
                  <p className="text-sm text-gray-600">
                    Jumlah: {item?.quantity}
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    Total: Rp{" "}
                    {parseInt(item?.totalHarga).toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  onClick={() => deleteItemsKeranjang(item.id)}
                  className="absolute right-0 top-0  p-1 text-gray-500 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })
        )}
        <div className="p-4 border-t">
          <label className="block text-gray-700 mb-1">Alamat Kirim</label>
          <textarea
            value={alamat_kirim}
            onChange={(e) => setAlamatKirim(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={3}
            required
          />
        </div>
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
