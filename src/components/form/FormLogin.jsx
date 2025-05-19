/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Header from "../home-page/Header";
const FormLogin = ({ switchForm }) => {
  const { handleLogin, pengguna } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLoginKlik = async (e) => {
    e.preventDefault();
    try {
      const data = await handleLogin(email, password);
      console.log(data);
      alert("Login Berhasil");
    } catch (error) {
      console.log("Login gagal: " + error.message);
    }
  };
  useEffect(() => {
    console.log("useEffect pengguna:", pengguna);
    if (pengguna) {
      if (pengguna.role === "pembeli") {
        navigate("/customer/dashboard");
      } else if (pengguna.role === "admin") {
        navigate("/admin/dashboard");
      }
    }
  }, [pengguna]);
  return (
    <form onSubmit={handleLoginKlik} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Kata Sandi"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-md bg-white/20 text-slate-900 placeholder-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600/80 text-1xl font-semibold text-white py-3 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>
      <p className="text-center mt-4 text-sm">
        Belum punya akun?{" "}
        <button
          type="button"
          onClick={switchForm}
          className="text-blue-900 underline"
        >
          Daftar di sini
        </button>
      </p>
    </form>
  );
};
export default FormLogin;
