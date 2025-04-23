import Image from "next/image";

export default async function About() {
  const companyData = await getCompanyData();
  return (
    <div className="text-center">
      <h1 className="section-title">About Us</h1>
      <p className="text-muted max-w-2xl mx-auto">
        {companyData.about || "Loading..."}
      </p>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
        <Image
          alt="Company Team"
          src={`/image/work.jpg`}
          width={400}
          height={300}
          className="rounded-lg h-auto shadow-lg transform transition-all hover:scale-105"
        />
        <Image
          alt="Work Environment"
          src={`/image/office.jpeg`}
          width={400}
          height={300}
          className="rounded-lg h-auto shadow-lg transform transition-all hover:scale-105"
        />
      </div>
    </div>
  );
}

async function getCompanyData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/company/${process.env.NEXT_PUBLIC_COMPANY_ID}`, {
    cache: 'no-cache',
    next: { revalidate: 24*60*60 },
  })
  const data = await res.json();
  return data.data;
}