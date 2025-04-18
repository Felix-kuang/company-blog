import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Company Profile",
  description: "Company profile built with Next.js 14 App Router",
};

export default async function RootLayout({ children }) {
  const companyName = await getCompanyName()
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar companyName={companyName}/>
        <main className="container max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <Footer companyName={companyName}/>
      </body>
    </html>
  );
}

async function getCompanyName() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/${process.env.NEXT_PUBLIC_COMPANY_ID}`, {
    cache: 'no-cache',
    next: { revalidate: 24*60*60 },
  })
  const data = await res.json();
  return data.data.name;
}
