import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { ProdukContext } from "../../context/ProdukContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { KeranjangContext } from "../../context/KeranjangContext";

const ProdukSection = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({}); // state untuk jumlah produk
  const { produkList } = useContext(ProdukContext);
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

  const handleTambahKeranjang = (produk) => {
    const qty = quantities[produk.id] || 0;
    if (qty === 0) return alert("Jumlah minimal 1");

    console.log("Tambah ke keranjang:", produk.nama, "qty:", qty);
  };

  const handleCheckout = () => {
    navigate("/login");
  };

  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-800">
        Produk Terbaru
      </h2>

      {!produkList || produkList.length === 0 ? (
        <p className="text-center text-gray-500">Memuat produk...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {produkList.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px rgba(59, 130, 246, 0.4)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg p-4 shadow-md cursor-pointer border border-transparent hover:border-blue-400 transition flex flex-col"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src={
                    item.image
                      ? `http://localhost:5000${
                          item.image.startsWith("/uploads/") ? "" : "/uploads/"
                        }${item.image}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.nama}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-gray-800 hover:text-blue-700 transition">
                {item.nama}
              </h3>
              <p className="text-sm text-gray-500">Stok: {item.stok}</p>
              <p className="mt-1 text-lg font-semibold text-gray-800 hover:text-blue-700 transition mb-2">
                {formatRupiah(item.harga)}
              </p>
              <p className="mt-3 text-lg font-semibold text-gray-800 hover:text-blue-700 transition">
                {item.keterangan || "Tidak ada keterangan"}
              </p>
              {!pengguna ? (
                <button
                  onClick={handleCheckout}
                  className="mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-4"
                >
                  Checkout
                </button>
              ) : (
                <>
                  <div className="flex items-center justify-between mt-auto mb-2">
                    <button
                      onClick={() => handleKurang(item.id)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="mx-2 font-medium">
                      {quantities[item.id] || 0}
                    </span>
                    <button
                      onClick={() => handleTambah(item.id, item.stok)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      const qty = quantities[item.id] || 0;
                      if (qty === 0) return alert("Jumlah minimal 1");
                      tambahKeKeranjang(item.id, qty);
                    }}
                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Tambah ke Keranjang
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProdukSection;
