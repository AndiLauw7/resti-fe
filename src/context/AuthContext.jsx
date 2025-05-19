/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import {
  getPenggunaById,
  loginPengguna,
  registerPengguna,
} from "../services/authServices";

export const AuthContext = createContext([]);

export const AuthProvider = ({ children }) => {
  const [pengguna, setPengguna] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", severity: "" });
  const [token, setToken] = useState(null);

  const fetchPenggunaFromToken = async (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;
    const res = await getPenggunaById(userId, token);
    setPengguna(res.data.data);
  };
  const handleLogin = async (email, password) => {
    setLoading(true);
    setMessage({ text: "", severity: "" });
    try {
      const res = await loginPengguna({ email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      await fetchPenggunaFromToken(res.data.token);
      setLoading(false);
      return res;
    } catch (error) {
      setMessage({
        text: "",
        severity: error.response?.data?.message || "Login gagal",
      });
      setLoading(false);
      throw error;
    }
  };
  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const res = await registerPengguna(data);
      return res;
    } catch (error) {
      setMessage({
        text: "",
        severity: error.response?.data?.message || "Register gagal",
      });
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPengguna(null);
  };

  useEffect(() => {
    if (token) {
      fetchPenggunaFromToken(token).catch(() => handleLogout());
    }
  }, [token]);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        pengguna,
        loading,
        message,
        token,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
