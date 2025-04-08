import { notFound } from "next/navigation";

const articles = {
  "artikel-1": { title: "Artikel 1", content: "Ini isi dari artikel pertama. Lorem ipsum dolor sit amet..." },
  "artikel-2": { title: "Artikel 2", content: "Ini isi dari artikel kedua. Lorem ipsum dolor sit amet..." },
  "artikel-3": { title: "Artikel 3", content: "Ini isi dari artikel ketiga. Lorem ipsum dolor sit amet..." },
};

export default function BlogDetail({ params }) {
  const article = articles[params.slug];

  if (!article) {
    return notFound();
  }

  return (
    <div className="text-center">
      <h1 className="section-title">{article.title}</h1>
      <p className="text-muted max-w-2xl mx-auto">{article.content}</p>
    </div>
  );
}
