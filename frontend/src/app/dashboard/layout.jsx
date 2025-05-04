"use client";

import '../globals.css'
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Auth } from './lib/auth';

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/dashboard/login";

  useEffect(() => {
    const protectedPath = pathname.startsWith("/dashboard");
    const token = Auth.getToken();
    if (protectedPath && !token) {
      router.replace("/dashboard/login");
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className="flex">
        {!isLoginPage && <Sidebar open={open} setOpen={setOpen} />}
        <div className="w-full">
          {!isLoginPage && (
            <Header setOpen={setOpen} username={Auth.getUsername()} />
          )}
          <div className="p-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
