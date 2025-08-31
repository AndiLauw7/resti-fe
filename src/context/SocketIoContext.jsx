import { createContext, useEffect, useState } from "react";
import socket from "../services/socket";

export const SocketIoContext = createContext(socket);
export const SocketIoProvider = ({ children }) => {
  return (
    <SocketIoContext.Provider value={socket}>
      {children}
    </SocketIoContext.Provider>
  );
};
