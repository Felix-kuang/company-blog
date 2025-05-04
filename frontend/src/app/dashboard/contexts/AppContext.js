"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, username }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
