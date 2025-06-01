import { NavLink, Outlet } from "react-router-dom";
import Header from "../../components/home-page/Header";
import Footer from "../../components/home-page/Footer";
import KeranjangSideBar from "../../pages/pengguna/Keranjang/KeranjangSideBar";

export const CustomerLayouts = () => {
  return (
    <>
      {/* <KeranjangSideBar /> */}
      <Header />
      <KeranjangSideBar />

      <main className="min-h-screen bg-white">
        <Outlet /> {/* Di sinilah konten halaman akan dirender */}
      </main>
      <Footer />
    </>
  );
};
