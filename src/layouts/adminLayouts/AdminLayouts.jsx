import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminLayouts = () => {
  const navigate = useNavigate();
  const { pengguna, handleLogout } = useContext(AuthContext);
  const klikLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  // if (!pengguna) return null;
  // const menu =
  //   pengguna.role === "admin"
  //     ? [
  //         { path: "/admin/dashboard", label: "Dashboard" },
  //         { path: "/admin/kategori", label: "Kelola Kategori" },
  //         { path: "/admin/produk", label: "Kelola Produk" },
  //         { path: "/admin/transaksi", label: "Kelola Transaksi" },
  //       ]
  //     : [
  //         { path: "/customer/dashboard", label: "Dashboard" },
  //         { path: "/customer/keranjang", label: "Keranjang" },
  //         { path: "/customer/transaksi", label: "Riwayat Transaksi" },
  //       ];
  // const panelTitle =
  //   pengguna.role === "admin" ? "Admin Panel" : "Customer Panel";
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/kategori">Kelola Kategori</Link>
          <Link to="/admin/produk">Kelola Produk</Link>
          <Link to="/admin/transaksi">Kelola Transaksi</Link>
          {/* {menu.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `px-2 py-1 rounded ${
                  isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-800"
                }`
              }
              key={item.path}
              to={item.path}
            >
              {item.label}
            </NavLink>
          ))} */}
          <button
            onClick={klikLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 overflow-auto">
        <div className="min-h-full p-6">
          <h1 className="text-2lg font-bold"> Hello,{pengguna.nama}</h1>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayouts;
