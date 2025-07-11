import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const CustomerPrivateRoute = ({ children }) => {
  const { token, pengguna } = useContext(AuthContext);

  if (!token || !pengguna) {
    return <Navigate to="/login" replace />;
  }

  if (pengguna.role !== "pembeli") {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};
export default CustomerPrivateRoute;
