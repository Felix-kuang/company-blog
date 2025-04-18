"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function About() {
  const  [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/company/${process.env.NEXT_PUBLIC_COMPANY_ID}`
    console.log(url)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {console.log(data);setCompanyData(data.data)})
      .catch((err) => console.error("Terjadi Error:", err));
  });

  return (
    <div className="text-center">
      <h1 className="section-title">About Us</h1>
      <p className="text-muted max-w-2xl mx-auto">
        {companyData.about}
      </p>

      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
        <Image
          alt="Company Team"
          src={`/image/work.jpg`}
          width={400}
          height={300}
          className="rounded-lg shadow-lg transform transition-all hover:scale-105"
        />
        <Image
          alt="Work Environment"
          src={`/image/office.jpeg`}
          width={400}
          height={300}
          className="rounded-lg shadow-lg transform transition-all hover:scale-105"
        />
      </div>
    </div>
  );
}
