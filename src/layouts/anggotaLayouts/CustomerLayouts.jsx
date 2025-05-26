import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/home-page/Header";
import Footer from "../../components/home-page/Footer";
import KeranjangSideBar from "../../pages/pengguna/Keranjang/KeranjangSideBar";

export const CustomerLayouts = () => {
  return (
    <>
      <Header />
      <KeranjangSideBar />
      <main className="pt-24 px-4 max-w-7xl mx-auto min-h-screen bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
