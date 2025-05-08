"use client";

import "../globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Auth from "@/app/dashboard/utils/auth"

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/dashboard/login";

  useEffect(() => {
    const token = Auth.getToken();

    if (isLoginPage) {
      setReady(true);
      return;
    }

    if (!token) {
      router.replace("/dashboard/login");
    } else {
      // Check if the token is expired
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Expiration time in milliseconds
      const currentTime = Date.now(); // Current time in milliseconds

      if (currentTime > expirationTime) {
        // Token expired, remove token and redirect to login
        Auth.removeToken(); // Assuming you have a method to remove the token
        router.replace("/dashboard/login");
        return;
      }

      setUsername(payload.username);
      setReady(true);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className="flex">
        {ready && <>
          {!isLoginPage && <Sidebar open={open} setOpen={setOpen} />}
          <div className="w-full">
            {!isLoginPage && <Header setOpen={setOpen} username={username} />}
            <div className="p-6">{children}</div>
          </div>
        </>}
      </body>
    </html>
  );
}
