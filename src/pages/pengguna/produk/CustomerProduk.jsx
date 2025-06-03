import { useContext, useState } from "react";
import { ProdukContext } from "../../../context/ProdukContext";
import { AuthContext } from "../../../context/AuthContext";
import { KeranjangContext } from "../../../context/KeranjangContext";
import { useNavigate } from "react-router-dom";

export const CustomerProduk = () => {
  const { produkList } = useContext(ProdukContext);
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const { pengguna } = useContext(AuthContext);
  const { tambahKeKeranjang } = useContext(KeranjangContext);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleTambah = (id, stock) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, stock),
    }));
  };

  const handleKurang = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleCheckout = () => {
    navigate("/login");
  };

  return (
    <div className="p-6 py-12 bg-gray-50 min-h-screen mt-5">
      <h6 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Produk Kami
      </h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produkList.map((produk) => (
          <div
            key={produk.id}
            className="bg-white border rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col"
          >
            <img
              src={
                produk.image
                  ? `http://localhost:5000${
                      produk.image.startsWith("/uploads/") ? "" : "/uploads/"
                    }${produk.image}`
                  : "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={produk.nama}
              className="h-45 w-full object-cover rounded-md mb-2"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {produk.nama}
            </h2>
            <p className="text-sm text-gray-500">Stok: {produk.stok}</p>
            <p className="mt-1 text-xl font-bold text-blue-700 mb-2">
              {formatRupiah(produk.harga)}
            </p>

            {!pengguna ? (
              <button
                onClick={handleCheckout}
                className="mt-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-md hover:from-blue-700 transition-all"
              >
                Checkout
              </button>
            ) : (
              <>
                <div className="flex items-center justify-between mt-auto mb-1">
                  <button
                    onClick={() => handleKurang(produk.id)}
                    className="bg-gray-200 w-8 h-8 rounded-full text-lg font-bold hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="font-semibold text-lg">
                    {quantities[produk.id] || 0}
                  </span>
                  <button
                    onClick={() => handleTambah(produk.id, produk.stok)}
                    className="bg-gray-200 w-8 h-8 rounded-full text-lg font-bold hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    const qty = quantities[produk.id] || 0;
                    if (qty === 0) return alert("Jumlah minimal 1");
                    tambahKeKeranjang(produk.id, qty);
                  }}
                  className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
                >
                  Tambah ke Keranjang
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
