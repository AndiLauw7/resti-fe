/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardAdmin from "./pages/admin/Dashboard.jsx";
import AdminLayouts from "./layouts/adminLayouts/AdminLayouts.jsx";
import { KategoriPage } from "./pages/admin/kategori/KategoriPage.jsx";
import { KategoriProvider } from "./context/KategoriContext.jsx";
import { ProdukPage } from "./pages/admin/produk/ProdukPage.jsx";
import { ProdukProvider } from "./context/ProdukContext.jsx";
import { TransaksiProvider } from "./context/TransaksiContext.jsx";
import { TransaksiPage } from "./pages/admin/transaksi/TransaksiPage.jsx";
import AuthLayouts from "./layouts/AuthLayouts.jsx";
import AdminPrivateRoute from "./private/AdminPrivateRoute.jsx";
import CustomerPrivateRoute from "./private/CustomerPrivateRoute.jsx";
import Error404 from "./pages/Eror404.jsx";
import HomePage from "./pages/HomePage.jsx";
import { CustomerLayouts } from "./layouts/anggotaLayouts/CustomerLayouts.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import KeranjangPage from "./pages/pengguna/Keranjang/KeranjangPage.jsx";
import { KeranjangProvider } from "./context/KeranjangContext.jsx";
import DashboardPage from "./pages/pengguna/DashboardPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <KategoriProvider>
                <ProdukProvider>
                  <HomePage />
                </ProdukProvider>
              </KategoriProvider>
            }
          />
          <Route path="/login" element={<AuthLayouts />}></Route>
          <Route path="/register" element={<AuthLayouts />}></Route>
          <Route path="/unauthorized" element={<Error404 />} />

          <Route path="/admin" element={<AdminPrivateRoute />}>
            <Route element={<AdminLayouts />}>
              <Route path="dashboard" element={<DashboardAdmin />} />
              <Route
                path="kategori"
                element={
                  <KategoriProvider>
                    <KategoriPage />
                  </KategoriProvider>
                }
              />
              <Route
                path="produk"
                element={
                  <KategoriProvider>
                    <ProdukProvider>
                      <ProdukPage />
                    </ProdukProvider>
                  </KategoriProvider>
                }
              />
              <Route
                path="transaksi"
                element={
                  <TransaksiProvider>
                    <TransaksiPage />
                  </TransaksiProvider>
                }
              />
            </Route>
          </Route>

          <Route
            path="/customer"
            element={
              <AuthProvider>
                <KeranjangProvider>
                  <CustomerLayouts />
                </KeranjangProvider>
              </AuthProvider>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="keranjang" element={<KeranjangPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
