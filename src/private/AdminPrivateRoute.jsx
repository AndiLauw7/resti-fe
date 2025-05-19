import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { token, pengguna } = useContext(AuthContext);
  if (!token || !pengguna) {
    return <Navigate to="/login" replace />;
  }

  if (pengguna.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
export default AdminPrivateRoute;
