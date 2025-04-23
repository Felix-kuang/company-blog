'use client'
import { useEffect, useState } from "react";
import Navbar from "@/app/company-profile/components/Navbar";
import Footer from "@/app/company-profile/components/Footer";
import "../globals.css";

export default function RootLayout({ children }) {
  const [companyName, setCompanyName] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/company/${process.env.NEXT_PUBLIC_COMPANY_ID}`);  // Ganti dengan endpoint API yang benar
      const data = (await res.json()).data;
      setCompanyName(data.name);

      setItems([
        { label: "Home", href: "/company-profile/" },
        { label: "About", href: "/company-profile/about" },
        { label: "Services", href: "/company-profile/services" },
        { label: "Blog", href: "/company-profile/blog" },
        { label: "FAQ", href: "/company-profile/faq" },
        { label: "Contact", href: "/company-profile/contact" },
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);


  return (
    <html lang="en">
      <body className="bg-gray-100">
        {!loading && companyName && items.length > 0 && (
          <>
            <Navbar companyName={companyName} navItems={items} />
            <main className="container max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
            <Footer companyName={companyName} />
          </>
        )}
      </body>
    </html>
  );
}
