import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import HeaderCustomer from "../components/home-page/HeaderCustomer";
import Header from "../components/home-page/Header";
import KeranjangSideBar from "../pages/pengguna/Keranjang/KeranjangSideBar";
import Footer from "../components/home-page/Footer";

const MainLayout = () => {
  const { pengguna } = useContext(AuthContext);
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) return <Outlet />;

  if (pengguna?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }
  return (
    <>
      {pengguna ? <HeaderCustomer /> : <Header />}
      {pengguna && <KeranjangSideBar />}
      <main className="min-h-screen bg-white">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
