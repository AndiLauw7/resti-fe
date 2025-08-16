import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { KeranjangProvider } from "./context/KeranjangContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeranjangProvider>
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </KeranjangProvider>
  </React.StrictMode>
);
