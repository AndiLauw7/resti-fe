import { createContext, useState } from "react";

export const SideBarContext = createContext();
export const SidebarProvider = ({ children }) => {
  const [activeSidebar, setActiveSidebar] = useState(null);

  const openSidebar = (type) => setActiveSidebar(type);
  const closeSidebar = () => setActiveSidebar(null);

  return (
    <SideBarContext.Provider
      value={{ activeSidebar, openSidebar, closeSidebar }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
