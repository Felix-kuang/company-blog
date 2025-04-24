"use client";

import "../globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); // Ambil pathname saat ini

  // Cek kalau path-nya '/login', ga tampilkan sidebar
  const isLoginPage = pathname === "/dashboard/login";

  return (
    <html lang="en">
      <body className="flex">
      {!isLoginPage && <Sidebar open={open} setOpen={setOpen}/>}
        <div className="w-full">
          <Header />
          <div className="p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
