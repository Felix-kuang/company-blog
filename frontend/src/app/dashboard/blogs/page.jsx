"use client";

import { useState, useEffect } from "react";
import Container from "../components/Container";
import DataTable from "../components/DataTable";
import AddButton from "../components/AddButton";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Simulate fetching company data from API
    const fetchBlogs = async () => {
      const blogData = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blog`
      ).then((res) => res.json());
      setBlogs(blogData.data);
    };

    fetchBlogs();
  }, []);

  const columns = [
    { key: "title", header: "Title" },
    {
      key: "author",
      header: "Author",
      render: (author) => author?.username ?? "No Author",
    },
    {
      key: "publishedAt",
      header: "Published Date",
      render: (date) =>
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(date)),
    },
  ];

  return (
    <Container>
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Blog Posts
        </h2>
        <AddButton label={"+ Add Blog"} onClick={() => {}} />
      </div>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <DataTable
          columns={columns}
          data={blogs}
          onDelete={() => {}}
          onEdit={() => {}}
        />

        {/* <table className=" min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left font-medium">Title</th>
              <th className="py-3 px-4 text-left font-medium">Author</th>
              <th className="py-3 px-4 text-left font-medium">
                Published Date
              </th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(({ id, title, author, publishedAt }) => (
              <tr
                key={id}
                className=" border-t border-gray-200 hover:bg-gray-50 transition-all"
              >
                <td className="py-4 px-6">{title}</td>
                <td className="py-4 px-6">{author?.username ?? "No Author"}</td>
                <td className="py-4 px-6">{formatDate(publishedAt)}</td>
                <td className="py-4 px-6">
                  <div className="space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 transition duration-300">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition duration-300">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </Container>
  );
}
