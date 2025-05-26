import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { KeranjangProvider } from "./context/KeranjangContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeranjangProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </KeranjangProvider>
  </React.StrictMode>
);
