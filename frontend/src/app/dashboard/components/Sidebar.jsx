"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  UsersIcon,
  NewspaperIcon,
  Building2,
  Star,
  TableOfContentsIcon,
  HandPlatterIcon,
  LogOutIcon,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Auth } from "../lib/auth";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";


export default function Sidebar({ open, setOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loadingMenu, setLoadingMenu] = useState(null);

  const menus = useMemo(
    () => [
      {
        name: "Company Data",
        href: "/dashboard/company-data",
        icon: Building2,
      },
      { name: "Blogs", href: "/dashboard/blogs", icon: NewspaperIcon },
      { name: "Testimonies", href: "/dashboard/testimonies", icon: Star },
      { name: "FAQ", href: "/dashboard/faq", icon: TableOfContentsIcon },
      { name: "Services", href: "/dashboard/services", icon: HandPlatterIcon },
      { name: "Users", href: "/dashboard/users", icon: UsersIcon },
    ],
    []
  );

  const handleLogout = () => {
    Auth.removeToken();
    router.push("/dashboard/login");
  };

  useEffect(() => {
    setLoadingMenu(null);
  }, [pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-screen bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        <SidebarHeader setOpen={setOpen} />
        <SidebarNav
          menus={menus}
          pathname={pathname}
          loadingMenu={loadingMenu}
          setLoadingMenu={setLoadingMenu}
          setOpen={setOpen}
        />
        {/* Logout */}
        <div className="pt-8 mt-8 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            <LogOutIcon className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
