import { motion } from "framer-motion";
import { KategoriContext } from "../../context/KategoriContext";
import { useContext } from "react";

const KategoriSection = () => {
  const { kategoriList } = useContext(KategoriContext);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-8 text-blue-800"
      >
        Kategori Produk
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {kategoriList.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-white text-center p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border-t-4 border-blue-100 hover:border-blue-500"
          >
            <p className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">
              {item.nama}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default KategoriSection;
