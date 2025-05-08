import Link from "next/link";
import axios from "axios";


export default async function Blog() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);
  const articles = res.data.data;

  return (
    <div className="text-center">
      <h1 className="section-title">Blog</h1>
      <p className="text-muted">Baca artikel terbaru dari kami.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div key={article.slug} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-muted">{article.desc}</p>
            <Link href={`blog/${article.slug}`} className="text-blue-600 hover:underline mt-2 inline-block">
              Baca Selengkapnya →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
