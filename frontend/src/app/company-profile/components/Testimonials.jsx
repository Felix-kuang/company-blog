export default function Testimonials({items}) {
  return (
    <div className="text-center mt-12">
      <h2 className="section-title">What Our Clients Say</h2>
      <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-6">
        {items.map((t, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md max-w-md"
          >
            <p className="text-muted italic">`{t.testimony}`</p>
            <h3 className="font-semibold mt-4">- {t.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
