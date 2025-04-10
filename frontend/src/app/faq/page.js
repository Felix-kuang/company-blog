"use client";

import { useEffect, useState } from "react";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/faq")
      .then((res) => res.json())
      .then((data) => setFaqs(data))
      .catch((err) => console.error("Terjadi Error:", err));
  }, []);

  return (
    <div className="text-center">
      <h1 className="section-title">Frequently Asked Questions</h1>
      <p className="text-muted">Pertanyaan yang sering diajukan:</p>

      <div className="mt-8 max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-semibold">{faq.question}</h3>
            <p className="text-muted">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
