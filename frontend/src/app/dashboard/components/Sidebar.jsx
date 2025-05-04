"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UsersIcon,
  NewspaperIcon,
  Building2,
  Star,
  TableOfContentsIcon,
  HandPlatterIcon,
  XIcon,
  LogOutIcon,
} from "lucide-react";

export default function Sidebar({open, setOpen}) {
  const pathname = usePathname();

  const menus = [
    {
      name: "Company Data",
      href: "/dashboard/company-data",
      icon: Building2,
    },
    {
      name: "Blogs",
      href: "/dashboard/blogs",
      icon: NewspaperIcon,
    },
    {
      name: "Testimonies",
      href: "/dashboard/testimonies",
      icon: Star,
    },
    {
      name: "FAQ",
      href: "/dashboard/faq",
      icon: TableOfContentsIcon,
    },
    {
      name: "Services",
      href: "/dashboard/services",
      icon: HandPlatterIcon,
    },
    {
      name: "Users",
      href: "/dashboard/users",
      icon: UsersIcon,
    },
  ];

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
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">
              Dashboard
            </span>
          </div>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setOpen(false)}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Nav */}
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {menus.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md
                      ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout */}
          <div className="pt-8 mt-8 border-t border-gray-200">
            <button className="w-full text-left flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">
              <LogOutIcon className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
