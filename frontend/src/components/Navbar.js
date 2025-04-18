"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({companyName}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shodow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="text-xl font-bold">{companyName}</h1>
        </Link>

        {/* Mobile Navigation */}
        <button className="block md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menus */}
        <ul className="hidden md:flex space-x-6">
          <NavItems />
        </ul>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-1/2 h-full bg-white z-50 shadow-lg md:hidden"
          >
            <div className="p-6">
              <button className="mb-6" onClick={() => setIsOpen(false)}>
                <X />
              </button>
              <ul className="flex flex-col space-y-4">
                <NavItems onClick={() => setIsOpen(false)} />
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavItems({ onClick }) {
  const items = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ];

  return items.map((item) => (
    <li key={item.href}>
      <Link href={item.href} className="hover:text-blue-500" onClick={onClick}>
        {item.label}
      </Link>
    </li>
  ));
}