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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayouts />}>
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
      </Routes>
    </Router>
  );
}

export default App;
