import { createContext, useEffect, useState } from "react";
import socket from "../services/socket";
export const SocketContext = createContext();
export const SocketProvider = ({ children }) => {
  const [tes, setTes] = useState(false);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server:", socket.id);
      setTes(true);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setTes(false);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, tes }}>
      {children}
    </SocketContext.Provider>
  );
};
