export default async function Contact() {
  const {phone,email} = await getContact();

  return (
    <div className="text-center">
      <h1 className="section-title">Contact Us</h1>
      <p className="text-muted">
        Ada pertanyaan? Hubungi kami lewat form di bawah.
      </p>

      <form className="mt-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-semibold">Nama</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            placeholder="Nama Anda"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            placeholder="Email Anda"
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-semibold">Pesan</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500 transition"
            placeholder="Tulis pesan Anda di sini..."
            rows="4"
          ></textarea>
        </div>

        <button type="submit" className="btn-primary">
          Kirim
        </button>
      </form>

      <div className="mt-6">
        <p className="text-gray-600">Atau hubungi langsung:</p>
        <p className="font-semibold">📧 {email}</p>
        <p className="font-semibold">📞 {phone}</p>
      </div>
    </div>
  );
}

async function getContact() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/company/${process.env.NEXT_PUBLIC_COMPANY_ID}`, {
    cache: 'no-cache',
    next: { revalidate: 24*60*60 },
  })
  const data = await res.json();
  return {
    "phone" : data.data.phone,
    "email" : data.data.email,
  };
}