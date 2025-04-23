"use client";

import "../globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const [activeTab, setActiveTab] = useState("companyData");
  const pathname = usePathname(); // Ambil pathname saat ini

  // Cek kalau path-nya '/login', ga tampilkan sidebar
  const isLoginPage = pathname === "/dashboard/login";

  return (
    <html lang="en">
      {!isLoginPage && <Sidebar setActiveTab={setActiveTab}/>}
      <body className="flex">
        <div className="w-full">
          <Navbar />
          <div className="p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
