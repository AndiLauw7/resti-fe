import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  "/images/banner1.webp",
  "/images/banner2.jpg",
  "/images/banner3.jpeg",
  "/images/banner4.webp",
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[475px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={banners[currentIndex]}
            alt={`Banner ${currentIndex + 1}`}
            className="w-full h-full object-cover brightness-75"
          />
          {/* Gradient overlay untuk efek warna dramatis */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg"
            >
              Temukan Furniture Impianmu
            </motion.h1>

            <motion.a
              href="/produk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#1D4ED8",
                boxShadow: "0 8px 15px rgba(29, 78, 216, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 cursor-pointer transition-all duration-300 ease-in-out"
            >
              Jelajahi Produk
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroBanner;
