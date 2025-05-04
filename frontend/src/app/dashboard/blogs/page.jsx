"use client";

import { useState, useEffect } from "react";

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

  return (
    <div>
      <h2 className="text-2xl mb-4">Blog</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Author</th>
            <th className="border border-gray-300 px-4 py-2">Published Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="border border-gray-300 px-4 py-2">{blog.title}</td>
              <td className="border border-gray-300 px-4 py-2">{blog.author}</td>
              <td className="border border-gray-300 px-4 py-2">{blog.publishedDate}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="text-blue-500 hover:underline mr-2">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
