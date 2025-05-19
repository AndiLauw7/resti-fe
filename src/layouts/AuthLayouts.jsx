/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import FormRegister from "../components/form/FormRegister";
import FormLogin from "../components/form/FormLogin";
import logo from "../../public/images/logoResti.webp";
import Header from "../components/home-page/Header";
import Footer from "../components/home-page/Footer";
const AuthLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const switchForm = () => {
    if (isRegister) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        // style={{ backgroundImage: `url(${logo})` }}
      >
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-white/50">
          <h2 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0_2px_#3b82f6]">
            <br />
          </h2>
          {isRegister ? (
            <FormRegister switchForm={switchForm} />
          ) : (
            <FormLogin switchForm={switchForm} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayouts;
