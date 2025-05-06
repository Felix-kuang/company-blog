"use client";

import "../globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Auth } from "./lib/auth";

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
      setReady(true);
    }

    const payload = token
      ? JSON.parse(atob(token.split(".")[1]))
      : { username: "" };

    setUsername(payload.username);
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
