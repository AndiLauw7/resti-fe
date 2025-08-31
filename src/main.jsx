import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { AuthProvider } from "./context/AuthContext.jsx";
import { KeranjangProvider } from "./context/KeranjangContext.jsx";
import { SocketIoProvider } from "./context/SocketIoContext.jsx";
import { SidebarProvider } from "./context/SideBarContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeranjangProvider>
      <AuthProvider>
        <SocketIoProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </SocketIoProvider>
      </AuthProvider>
    </KeranjangProvider>
  </React.StrictMode>
);
