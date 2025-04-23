import { notFound } from "next/navigation";
import ArticleContent from "./ArticleContent"
import Link from "next/link";

export default async function BlogDetail({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.slug}`);
  const article = (await res.json()).data;

  if (!article) {
    return notFound();
  }

  return (
    <div>
      <Link
          href="/company-profile/blog"
          className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
        >
          ← Kembali ke Blog
        </Link>
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <ArticleContent content={article.content} />
      <div className="mt-8">
        <Link
          href="/company-profile/blog"
          className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
        >
          ← Kembali ke Blog
        </Link>
      </div>
    </div></div>
  );
}
