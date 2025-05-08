'use client'
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from "react";
import FormInput from "@/app/dashboard/components/FormInput";
import SaveCancelButtons from "@/app/dashboard/components/SaveCancelButton";
import Auth from "@/app/dashboard/lib/auth";

export default function EditBlogPage() {
    const params = useParams();
    const router = useRouter();
    const blogSlug = params.blogSlug;

    const [blog, setBlog] = useState({
        title: '', content: '',
    });

    const fields = [{
        name: "title", label: "Title",
    }, {
        name: "content", label: "Blog Content", type: "textarea", rows: 10,
    }]

    useEffect(() => {
        void (async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`);
            const data = await res.json();
            setBlog(data.data);
        })();
    }, [blogSlug]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setBlog((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blogSlug}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Auth.getToken()}`,
            },
            body: JSON.stringify(blog)

        });

        if (res.ok) {
            const data = await res.json();
            alert(data.message); // Assuming response includes a message
            router.push('/dashboard/blogs');
        } else {
            const errorData = await res.json();
            alert(errorData.message || 'Failed to update blog');
        }
    }

    const handleCancel = (e) => {
        //return to blog list without saving
        router.push('/dashboard/blogs');
    }

    // if (!blog.title || !blog.content) return <p>Loading...</p>;

    return (<div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Edit Blog: {blogSlug}</h1>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                {fields.map((field) => (<FormInput
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={blog[field.name]}
                    onChange={handleInputChange}
                    type={field.type}
                    rows={field.rows}
                />))}
            </div>
            <SaveCancelButtons
                onSave={handleSubmit}
                onCancel={handleCancel}
            />
        </form>

    </div>);
}
