import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TransaksiContext } from "../../../context/TransaksiContext";
import {
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Profil = () => {
  const { pengguna, setPengguna, token } = useContext(AuthContext);
  const { transaksiUser, loading } = useContext(TransaksiContext);
  const [isEditing, setIsEditing] = useState(false);
  const pdfRef = useRef(null);
  const [formData, setFormData] = useState({
    nama: pengguna?.nama || "",
    email: pengguna?.email || "",
    alamat: pengguna?.alamat || "",
    nohp: pengguna?.nohp || "",
    image: null,
  });

  // const handleDownload = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     pdf.save("riwayat-transaksi.pdf");
  //   });
  // };
  /*************  ✨ Codeium Command 🌟  *************/
  /**
   * Handle form input change
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleDownload = (trx) => {
    const pdf = new jsPDF("p", "mm", "a4");

    // If input is a file, set the file to the state
    pdf.setFontSize(16);
    pdf.text("Detail Transaksi", 20, 20);

    // Otherwise set the value to the state
    pdf.setFontSize(12);
    pdf.text(`Kode Transaksi: ${trx.midtransOrderId}`, 20, 40);
    pdf.text(`Status: ${trx.status}`, 20, 50);
    /******  ad355917-3471-43df-aeb4-3f816a99bed1  *******/
    pdf.text(`Total: ${formatRupiah(trx.total)}`, 20, 60);
    pdf.text(
      `Tanggal: ${new Date(trx.tanggal).toLocaleDateString("id-ID")}`,
      20,
      70
    );

    // List item produk
    let y = 90;
    trx.TransaksiItems?.forEach((item, index) => {
      console.log(item);
      
      pdf.text(
        `${index + 1}. ${item.Produk?.nama} - ${item.quantity} x ${formatRupiah(
          item.Produk?.harga
        )} = ${formatRupiah(item.quantity * item.Produk?.harga)}`,
        20,
        y
      );
      y += 10;
    });

    pdf.save(`transaksi-${trx.midtransOrderId}.pdf`);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("nama", formData.nama);
      fd.append("email", formData.email);
      fd.append("alamat", formData.alamat);
      fd.append("nohp", formData.nohp);
      if (formData.image) fd.append("image", formData.image);

      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/pengguna/update-pengguna/${
          pengguna.id
        }`,
        fd,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPengguna(res.data.data); // update context
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

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
    <div className="max-w-6xl mx-auto  px-6 pt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold mb-8  text-center text-gray-800">
          Profil Pengguna
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center ">
            <div className="flex justify-center">
              <img
                src={
                  pengguna?.image
                    ? `${import.meta.env.VITE_BASE_URL}${pengguna.image}`
                    : ""
                }
                alt="Foto Profil"
                className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500 mb-4"
              />
            </div>

            {!isEditing ? (
              <div className="flex flex-col items-center md:items-start w-full bg-gray-50 rounded-xl p-5 shadow-sm space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {pengguna?.nama}
                </h2>

                <div className="w-full space-y-3 text-gray-700">
                  <p className="flex items-center gap-2 border-b pb-2">
                    <span className="font-medium">📧 Email:</span>{" "}
                    {pengguna?.email}
                  </p>
                  <p className="flex items-center gap-2 border-b pb-2">
                    <span className="font-medium">📍 Alamat:</span>{" "}
                    {pengguna?.alamat || "-"}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">📱 No HP:</span>{" "}
                    {pengguna?.nohp || "-"}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-6 py-2 rounded-full bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition duration-200"
                >
                  ✏️ Edit Profil
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-3 w-full"
              >
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Nama"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="Alamat"
                />
                <input
                  type="text"
                  name="nohp"
                  value={formData.nohp}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  placeholder="No HP"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Kolom Kanan - Riwayat Transaksi */}
          <div>
            <h2 className="text-2xl font-semibold mb-5 text-gray-800">
              Riwayat Transaksi
            </h2>

            <div ref={pdfRef} className="max-h-[250px] overflow-y-auto pr-2">
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
                      {/* {isExpanded && (
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
                                {formatRupiah(
                                  item.quantity * item.Produk?.harga
                                )}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-4 text-sm text-gray-500">
                            Tanggal Transaksi:{" "}
                            {new Date(trx.tanggal).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      )} */}
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
                                {formatRupiah(
                                  item.quantity * item.Produk?.harga
                                )}
                              </li>
                            ))}
                          </ul>

                          <p className="mt-4 text-sm text-gray-500">
                            Tanggal Transaksi:{" "}
                            {new Date(trx.tanggal).toLocaleDateString("id-ID")}
                          </p>

                          {/* 🔽 Tambahin tombol download per transaksi */}
                          <button
                            onClick={() => handleDownload(trx)}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
                          >
                            Download PDF
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
