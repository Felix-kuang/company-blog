import Link from "next/link";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <>
      <section className="text-center py-20 bg-gray-400 text-white">
        <h1 className="text-5xl font-bold">Welcome to Our Company</h1>
        <p className="mt-4 text-lg">
          We provide awesome services to help your business grow.
        </p>
        <Link href={"/services"}>
          <button className="mt-6 btn-primary">Get Started</button>
        </Link>
      </section>

      {/* About Preview */}
      <section className="container mx-auto p-10 text-center">
        <h2 className="section-title">Who We Are</h2>
        <p className="text-muted max-w-2xl mx-auto">
          Kami adalah perusahaan yang bergerak di bidang [isi bidang bisnis].
          Dengan pengalaman bertahun-tahun, kami berkomitmen untuk memberikan
          layanan terbaik kepada pelanggan.
        </p>
        <Link href="/about">
          <button className="mt-6 btn-primary">Learn More</button>
        </Link>
      </section>

      <Testimonials />
    </>
  );
}
