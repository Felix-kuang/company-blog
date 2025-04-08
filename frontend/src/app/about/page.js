import Image from "next/image";

export default function About() {
  return (
    <div className="text-center">
      <h1 className="section-title">About Us</h1>
      <p className="text-muted max-w-2xl mx-auto">
        Kami adalah perusahaan yang bergerak di bidang [isi bidang bisnis].
        Dengan pengalaman bertahun-tahun, kami berkomitmen untuk memberikan
        layanan terbaik kepada pelanggan.
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
