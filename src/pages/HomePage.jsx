import Footer from "../components/home-page/Footer";
import Header from "../components/home-page/Header";
import HeroBanner from "../components/home-page/HerroBanner";
import KategoriSection from "../components/home-page/KategoriSection";
import ProdukSection from "../components/home-page/ProdukSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 bg-white">
      {/* <Header />
      <HeroBanner />
      <KategoriProvider>
        <KategoriSection />
      </KategoriProvider>
      <KeranjangProvider>
        <ProdukProvider>
          <ProdukSection />
        </ProdukProvider>
      </KeranjangProvider>
      <Footer /> */}
      <HeroBanner />
      <KategoriSection />
      <ProdukSection />
    </div>
  );
};
export default HomePage;
