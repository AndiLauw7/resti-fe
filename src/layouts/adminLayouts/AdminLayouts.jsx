// import React, { useContext } from "react";
// import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const AdminLayouts = () => {
//   const navigate = useNavigate();
//   const { pengguna, handleLogout } = useContext(AuthContext);
//   const klikLogout = async () => {
//     await handleLogout();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 bg-blue-900 text-white p-4">
//         <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
//         <nav className="flex flex-col gap-2">
//           <Link to="/admin/dashboard">Dashboard</Link>
//           <Link to="/admin/kategori">Kelola Kategori</Link>
//           <Link to="/admin/produk">Kelola Produk</Link>
//           <Link to="/admin/transaksi">Kelola Transaksi</Link>

//           <button
//             onClick={klikLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </nav>
//       </aside>

//       <main className="flex-1 bg-gray-100 overflow-auto">
//         <div className="min-h-full p-6">
//           <h1 className="text-2lg font-bold"> Hello,{pengguna.nama}</h1>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminLayouts;
import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Import icon dari react-icons (pakai Feather Icons untuk clean look)
import {
  FiHome,
  FiTag,
  FiPackage,
  FiShoppingCart,
  FiLogOut,
} from "react-icons/fi";

const AdminLayouts = () => {
  const navigate = useNavigate();
  const { pengguna, handleLogout } = useContext(AuthContext);

  const klikLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  // Fungsi untuk styling link aktif
  const activeClass =
    "bg-blue-700 text-white rounded flex items-center gap-2 px-2 py-2 font-semibold transition-colors duration-200";
  const inactiveClass =
    "text-blue-200 hover:bg-blue-700 hover:text-white rounded flex items-center gap-2 px-2 py-2 transition-colors duration-200";

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-extrabold mb-6 tracking-wide">
          Admin Panel
        </h2>
        <nav className="flex flex-col gap-2 flex-grow">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <FiHome size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/kategori"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <FiTag size={20} />
            Kelola Kategori
          </NavLink>

          <NavLink
            to="/admin/produk"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <FiPackage size={20} />
            Kelola Produk
          </NavLink>

          <NavLink
            to="/admin/transaksi"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            <FiShoppingCart size={20} />
            Kelola Transaksi
          </NavLink>
          <button
            onClick={klikLogout}
            className="mt-auto bg-red-600 hover:bg-red-700 flex items-center gap-2 justify-center py-2 rounded transition-colors duration-200 font-semibold"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold ">Hello, {pengguna?.nama}</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayouts;
