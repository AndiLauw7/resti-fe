/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const FormRegister = ({ switchForm }) => {
  const { handleRegister } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    alamat: "",
    nohp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(formData, "anggota");
      alert("Registrasi berhasil! Silakan login.");
      switchForm();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        name="nama"
        placeholder="Nama Lengkap"
        value={formData.nama}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="email"
        placeholder=" Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="alamat"
        name="alamat"
        placeholder="alamat"
        value={formData.alamat}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="nohp"
        name="nohp"
        placeholder="nohp"
        value={formData.nohp}
        onChange={handleChange}
        required
        className="w-full p-2 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600/80 text-1xl font-semibold text-white py-3 rounded-md  hover:bg-blue-700 s transition"
      >
        Register
      </button>
      <p className="text-center mt-2 text-sm">
        Sudah punya akun?{" "}
        <button
          type="button"
          onClick={switchForm}
          className="text-blue-900 underline"
        >
          Login di sini
        </button>
      </p>
    </form>
  );
};

export default FormRegister;
