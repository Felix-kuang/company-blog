"use client";
import { useState, useEffect } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const baseUrl = process.env.BASE_URL;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/our-service`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Terjadi Error:", err));
  });

  return (
    <div className="text-center">
      <h1 className="section-title">Our Services</h1>
      <p className="text-muted">Berikut layanan yang kami tawarkan:</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
