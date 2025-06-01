import { useContext, useState } from "react";

import {
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { TransaksiContext } from "../../../context/TransaksiContext";
import { AuthContext } from "../../../context/AuthContext";

const Profil = () => {
  const { pengguna } = useContext(AuthContext);
  const { transaksiUser, loading } = useContext(TransaksiContext);
  const [expandedIds, setExpandedIds] = useState([]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
      case "paid":
        return <FaCheckCircle className="text-green-500" />;
      case "failed":
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "pending":
        return <FaClock className="text-yellow-500" />;
      default:
        return null;
    }
  };

  if (loading) return <p className="text-center mt-10">Loading transaksi...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-5 py-12">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Profil Pengguna
      </h1>

      {/* Profil Card */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6 mb-10">
        <img
          src={pengguna?.image || "/default-profile.png"}
          alt="Foto Profil"
          className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
        />
        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">
            {pengguna?.nama}
          </h2>
          <p className="text-gray-600">
            <strong>Email:</strong> {pengguna?.email}
          </p>
          <p className="text-gray-600">
            <strong>Alamat:</strong> {pengguna?.alamat || "-"}
          </p>
          <p className="text-gray-600">
            <strong>No HP:</strong> {pengguna?.noHp || "-"}
          </p>
        </div>
      </div>

      {/* Riwayat Transaksi */}
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">
        Riwayat Transaksi
      </h2>
      {transaksiUser.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada transaksi ditemukan.
        </p>
      ) : (
        transaksiUser.map((trx) => {
          const isExpanded = expandedIds.includes(trx.id);
          return (
            <div
              key={trx.id}
              className="mb-5 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => toggleExpand(trx.id)}
              aria-expanded={isExpanded}
            >
              <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-t-lg">
                <h4 className="font-semibold text-indigo-700">
                  Kode: {trx.midtransOrderId}
                </h4>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(trx.status)}
                  <span
                    className={`font-semibold capitalize ${
                      trx.status === "failed"
                        ? "text-red-600"
                        : trx.status === "pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {trx.status}
                  </span>
                  {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {isExpanded && (
                <div className="p-4 bg-white rounded-b-lg">
                  <p className="mb-3 text-gray-700 font-medium">
                    Total:{" "}
                    <span className="text-indigo-600">
                      {formatRupiah(trx.total)}
                    </span>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    {trx.TransaksiItems?.map((item) => (
                      <li key={item.id}>
                        {item.Produk?.nama} - {item.quantity} x{" "}
                        {formatRupiah(item.Produk?.harga)} ={" "}
                        {formatRupiah(item.quantity * item.Produk?.harga)}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-500">
                    Tanggal Transaksi:{" "}
                    {new Date(trx.tanggal).toLocaleDateString("id-ID")}
                  </p>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Profil;
