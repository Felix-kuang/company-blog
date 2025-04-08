const services = [
  { title: "Web Development", desc: "Kami membangun website yang cepat dan modern." },
  { title: "SEO Optimization", desc: "Optimasi website biar muncul di halaman pertama Google." },
  { title: "Digital Marketing", desc: "Strategi marketing digital yang efektif dan hasil nyata." },
];

export default function Services() {
  return (
    <div className="text-center">
      <h1 className="section-title">Our Services</h1>
      <p className="text-muted">Berikut layanan yang kami tawarkan:</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="text-muted">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
