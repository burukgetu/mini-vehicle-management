/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const SidebarContext = createContext();

// Create Provider Component
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 768 ) {
      setIsOpen(true)
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom Hook for Sidebar Context
export const useSidebar = () => useContext(SidebarContext);