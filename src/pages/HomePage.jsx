import Footer from "../components/home-page/Footer";
import Header from "../components/home-page/Header";
import HeroBanner from "../components/home-page/HerroBanner";
import KategoriSection from "../components/home-page/KategoriSection";
import ProdukSection from "../components/home-page/ProdukSection";
import { KategoriProvider } from "../context/KategoriContext";
import { KeranjangProvider } from "../context/KeranjangContext";
import { ProdukProvider } from "../context/ProdukContext";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 bg-white">
      <Header />
      <HeroBanner />
      <KategoriProvider>
        <KategoriSection />
      </KategoriProvider>
      <KeranjangProvider>
        <ProdukProvider>
          <ProdukSection />
        </ProdukProvider>
      </KeranjangProvider>
      <Footer />
    </div>
  );
};
export default HomePage;
