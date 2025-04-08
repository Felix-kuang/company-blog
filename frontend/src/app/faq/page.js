const faqs = [
  { question: "Apakah layanan ini berbayar?", answer: "Ya, layanan kami berbayar dengan harga yang kompetitif." },
  { question: "Apakah ada garansi?", answer: "Kami memberikan garansi kepuasan pelanggan selama 30 hari." },
  { question: "Bagaimana cara menghubungi customer support?", answer: "Silakan hubungi kami melalui halaman Contact atau email." },
];

export default function FAQ() {
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
