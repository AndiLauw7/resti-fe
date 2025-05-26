import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { KeranjangContext } from "../../context/KeranjangContext";
import { IconButton } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { pengguna, handleLogout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const { toggleSideBar } = useContext(KeranjangContext);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/produk?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const klikLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md px-6 py-4 fixed w-full top-0 z-50"
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <svg className="h-8 w-8 text-blue-600" /* logo SVG */ />
            <h1 className="text-2xl font-bold text-blue-800">MyFurniture</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Desktop */}
            <form onSubmit={handleSearchSubmit} className="relative ml-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="pl-10 pr-4 py-1 rounded-md border text-sm w-64"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>
            <nav className="flex space-x-6">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Beranda
              </a>
              <a
                href="/produk"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Produk
              </a>
              {isAuthPage ? null : pengguna ? (
                <>
                  <IconButton
                    sx={{
                      p: 0,
                      color: "#4B5563",
                      "&:hover": {
                        color: "#2563EB",
                      },
                    }}
                    onClick={toggleSideBar}
                  >
                    <ShoppingCart size={20} />
                  </IconButton>

                  <div className="relative group">
                    <User
                      className="text-gray-700 hover:text-blue-600 cursor-pointer"
                      size={20}
                    />
                    <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded shadow-md py-2 px-4">
                      <p className="text-sm mb-2 font-medium">
                        {pengguna.nama}
                      </p>
                      <a
                        href="/profil"
                        className="block text-sm hover:text-blue-600"
                      >
                        Profil
                      </a>
                      <button
                        onClick={klikLogout}
                        className="block text-sm text-red-600 mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Masuk
                </a>
              )}
            </nav>
          </div>

          {/* Mobile */}
          <div className="flex items-center space-x-4 md:hidden">
            <button onClick={toggleSearch}>
              <Search size={24} />
            </button>
            <button onClick={toggleMenu}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden px-4"
          >
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 border rounded-md"
              autoFocus
            />
          </motion.form>
        )}

        {/* Mobile Nav */}
        {isOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            className="md:hidden flex flex-col px-4 pb-4"
          >
            <a href="/" className="text-gray-700 hover:text-blue-600">
              Beranda
            </a>
            <a href="/produk" className="text-gray-700 hover:text-blue-600">
              Produk
            </a>
            {!pengguna ? (
              <a href="/login" className="text-gray-700 hover:text-blue-600">
                Masuk
              </a>
            ) : (
              <>
                <a
                  href="/keranjang"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Keranjang
                </a>

                <a href="/profil" className="text-gray-700 hover:text-blue-600">
                  Profil
                </a>
                <button onClick={klikLogout} className="text-red-600 mt-1">
                  Logout
                </button>
              </>
            )}
          </motion.nav>
        )}
      </motion.header>
      <div className="h-[4px] w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 shadow-md" />
    </>
  );
};

export default Header;
