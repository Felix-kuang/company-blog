"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import Container from "../components/Container";
import DataTable from "../components/DataTable";
import AddButton from "../components/AddButton";
import axiosInstance from "@dashboard/utils/axiosInstance";

export default function BlogPage() {
    const router = useRouter();

    const [blogs, setBlogs] = useState([]);
    const columns = [
        {key: "title", header: "Title"},
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

    useEffect(() => {
        void (async () => {
            const res = await axiosInstance.get("/blog")
            const blogData = res.data;
            setBlogs(blogData.data);
        })();
    }, []);


    const handleEdit = (blog) => {
        router.push(`/dashboard/blogs/${blog.slug}/edit`);
    }

    const handleDelete = async (blog) => {
        const confirmDelete = window.confirm(`Are you sure to delete "${blog.title}"?`);
        if (!confirmDelete) {
            return
        }

        try {
            await axiosInstance.delete(`/blog/${blog.slug}`);
            // Refresh data after delete
            setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
        } catch (error) {
            console.error("Failed to delete blog:", error);
        }


    }

    return (
        <Container>
            <div className="flex justify-between">
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                    Blog Posts
                </h2>
                <AddButton label={"+ Add Blog"} onClick={() => {
                }}/>
            </div>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <DataTable
                    columns={columns}
                    data={blogs}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>
        </Container>
    );
}
