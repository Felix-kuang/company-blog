export default function ArticleContent({ content }) {
  // Split by \n, lalu kita filter supaya 3 atau lebih line breaks berturut-turut jadi satu block
  const lines = content.split("\\n");

  const processedContent = lines.reduce((acc, line, idx) => {
    // Cek kalau ada 3 line kosong berturut-turut (\\n \\n \\n)
    if (line === "" && lines[idx + 1] === "" && lines[idx + 2] === "") {
      acc.push(<div key={idx} className="my-4" />);  // Bisa pakai <hr /> atau block lain sesuai selera
    } else {
      acc.push(<p key={idx}>{line}</p>);
    }
    return acc;
  }, []);

  return <div className="space-y-2">{processedContent}</div>;
}
