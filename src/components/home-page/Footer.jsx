import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Logo */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Furniture Custom</h2>
          <p className="text-blue-300 max-w-xs">
            Temukan furniture impianmu dengan kualitas terbaik dan desain
            modern.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-blue-200">
            <li>
              <a href="/" className="hover:text-white transition">
                Beranda
              </a>
            </li>
            <li>
              <a href="/produk" className="hover:text-white transition">
                Produk
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition">
                Masuk
              </a>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="font-semibold mb-3">Kontak Kami</h3>
          <p className="text-blue-200">Email: support@Furniture Custom.com</p>
          <p className="text-blue-200">Telepon: +62 812 3456 7890</p>
          <p className="text-blue-200">Alamat: , Tangerang</p>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="font-semibold mb-3">Ikuti Kami</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6 hover:text-blue-400 transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6 hover:text-blue-400 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 hover:text-blue-400 transition" />
            </a>
            <a href="mailto:support@FurnitureCustom.com" aria-label="Email">
              <Mail className="w-6 h-6 hover:text-blue-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-blue-800 pt-4 text-center text-blue-300 text-sm select-none">
        &copy; {new Date().getFullYear()} Furniture Custom. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
