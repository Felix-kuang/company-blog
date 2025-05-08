import axios from "axios";

export default async function Services() {
  const services = await getServices();

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

export async function getServices(){
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/our-service`, {
        headers: {
            'Cache-Control': 'no-cache',
        },
    });

    return res.data.data;
}