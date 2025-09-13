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
const RAJA_ONGKIR = import.meta.env.VITE_RAJA_ONGKIR_API_KEY;

const [provinsiId, setProvinsiId] = useState("");
const [provinces, setProvinces] = useState([]);
const [kotaId, setKotaId] = useState("");
const [cities, setCities] = useState([]);

const [ongkir, setOngkir] = useState(null);
const [selectedCourier, setSelectedCourier] = useState("");
const [costs, setCosts] = useState([]);
const [selectedService, setSelectedService] = useState("");
const fetchProvinces = async () => {
  try {
    const res = await axios.get("/rajaongkir/api/v1/destination/province", {
      headers: { Key: RAJA_ONGKIR },
    });
    console.log("Provinces response:", res.data);
    setProvinces(res.data.data || []);
  } catch (error) {
    console.error("Gagal ambil provinsi:", error);
  }
};

const fetchCities = async (provinceId) => {
  try {
    const res = await axios.get(
      `/rajaongkir/api/v1/destination/city/${provinceId}`,
      {
        headers: {
          Key: RAJA_ONGKIR,
        },
      }
    );
    console.log("Cities response:", res.data);
    setCities(res.data.data || []);
  } catch (error) {
    console.error("Gagal ambil kota:", error);
  }
};
const fetchCost = async (origin, destination, weight, courier) => {
  try {
    const params = new URLSearchParams();
    params.append("origin", origin);
    params.append("destination", destination);
    params.append("weight", weight.toString());
    params.append("courier", courier);
    params.append("price", "lowest");

    const res = await axios.post(
      "/rajaongkir/api/v1/calculate/domestic-cost",
      params,
      {
        headers: {
          Key: RAJA_ONGKIR,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Cost response:", res.data);
    setCosts(res.data.data || []);
  } catch (error) {
    console.error(
      "Gagal hitung ongkir:",
      error.response?.data || error.message
    );
  }
};
useEffect(() => {
  fetchProvinces();
}, []);
useEffect(() => {
  if (provinsiId) {
    fetchCities(provinsiId);
  } else {
    setCities([]);
    setKotaId("");
  }
}, [provinsiId]);

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
  if (!ongkir || !selectedCourier) {
    alert("Pilih kurir dan layanan pengiriman terlebih dahulu!");
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

    // Hitung total produk
    const totalProduk = keranjangList
      .filter((item) => selectItems.includes(item.id))
      .reduce((sum, item) => sum + item.Produk.harga * item.quantity, 0);

    const selected = costs.find((c) => c.service === selectedService);

    const transaksiResponse = await axios.post(
      `${BASE_URL_API}/transaksi/create-transaksi`,
      {
        penggunaId,
        tanggal,
        alamat_kirim,
        provinsiId,
        kotaId,
        items: itemsToCheckout,
        ongkir,
        kurir: selected?.code || "",
        layanan: selected?.service || "",
        estimasi: selected?.etd || "",
        total: totalProduk + ongkir,
      }
    );
    console.log(transaksiResponse);

    const transaksiId = transaksiResponse.data.data.id;

    const paymentResponse = await axios.post(
      `${BASE_URL_API}/payment/midtrans/create-payment`,
      { transaksiId }
    );

    const redirectUrl = paymentResponse.data.redirectUrl;
    window.open(redirectUrl, "_blank");

    alert("Checkout berhasil!");
  } catch (error) {
    console.error(error);
    alert(
      "Gagal checkout: " + (error.response?.data?.message || error.message)
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
                  Total: Rp {parseInt(item?.totalHarga).toLocaleString("id-ID")}
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
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={provinsiId}
          onChange={(e) => {
            setProvinsiId(Number(e.target.value));
          }}
        >
          <option value="">Pilih Provinsi</option>
          {Array.isArray(provinces) &&
            provinces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={kotaId}
          onChange={(e) => setKotaId(Number(e.target.value))}
        >
          <option value="">Pilih Kota/Kabupaten</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          value={selectedCourier}
          onChange={(e) => {
            const courier = e.target.value;
            setSelectedCourier(courier);
            setSelectedService("");
            setOngkir(null);
            if (kotaId) {
              fetchCost("501", kotaId, 1000, courier);
            }
          }}
        >
          <option value="">Pilih Kurir</option>
          <option value="jne">JNE</option>
          <option value="pos">POS</option>
          <option value="tiki">TIKI</option>
        </select>

        <label className="block text-gray-700 mb-1">Detail Alamat</label>
        <textarea
          value={alamat_kirim}
          onChange={(e) => setAlamatKirim(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2"
          rows={3}
          required
        />

        <div>
          {costs.length > 0 && (
            <select
              className="w-full border border-gray-300 rounded-lg p-2 mt-2"
              value={selectedService}
              onChange={(e) => {
                const serviceCode = e.target.value;
                setSelectedService(serviceCode);

                // Cari biaya ongkir dari service yang dipilih
                const selected = costs.find((c) => c.service === serviceCode);
                if (selected) {
                  setOngkir(selected.cost);
                } else {
                  setOngkir(null);
                }
              }}
            >
              <option value="">Pilih Layanan</option>
              {costs.map((c) => (
                <option key={c.service} value={c.service}>
                  {c.service} - {c.etd} - Rp {c.cost.toLocaleString("id-ID")}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="text-sm text-gray-700">
            Total Harga Barang: Rp{" "}
            {keranjangList
              .filter((item) => selectItems.includes(item.id))
              .reduce((sum, item) => sum + parseInt(item.totalHarga), 0)
              .toLocaleString("id-ID")}
          </p>
          <p className="text-sm text-gray-700">
            Ongkir: Rp {ongkir ? ongkir.toLocaleString("id-ID") : "0"}
          </p>
          <p className="text-base font-semibold mt-2">
            Total Bayar: Rp{" "}
            {(
              keranjangList
                .filter((item) => selectItems.includes(item.id))
                .reduce((sum, item) => sum + parseInt(item.totalHarga), 0) +
              (ongkir || 0)
            ).toLocaleString("id-ID")}
          </p>
        </div>
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
