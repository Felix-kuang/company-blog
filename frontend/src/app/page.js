import Link from "next/link";
import Testimonials from "@/components/Testimonials";

export default async function HomePage() {
  const companyData = await getCompanyData();

  return (
    <>
      <section className="relative text-center py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/image/banner.jpeg')] bg-cover bg-center" />

          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/40 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold">Welcome to {companyData.name}</h1>
          <p className="mt-4 text-lg">
            {companyData.slogan}
          </p>
          <Link href={"/services"}>
            <button className="mt-6 btn-primary">Get Started</button>
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="container mx-auto p-10 text-center">
        <h2 className="section-title">Who We Are</h2>
        <p className="text-muted max-w-2xl mx-auto">
          {companyData.about}
        </p>
        <Link href="/about">
          <button className="mt-6 btn-primary">Learn More</button>
        </Link>
      </section>

      <Testimonials />
    </>
  );
}

async function getCompanyData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company/${process.env.NEXT_PUBLIC_COMPANY_ID}`, {
    cache: 'no-cache',
    next: { revalidate: 24*60*60 },
  })
  const data = await res.json();
  return data.data;
}