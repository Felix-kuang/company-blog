'use client'
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from "react";
import FormInput from "@dashboard/components/FormInput";
import SaveCancelButtons from "@dashboard/components/SaveCancelButton";
import axiosInstance from "@dashboard/utils/axiosInstance";

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
        try{
            void (async () => {
                const res = await axiosInstance.get(`/blog/${blogSlug}`);
                const data = await res.data;
                setBlog(data.data);
            })();
        } catch (e) {
            console.error(e);
            alert(e.message);
        }
    }, [blogSlug]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setBlog((prev) => ({
            ...prev, [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await axiosInstance.put(
                `/blog/${blogSlug}`,
                {...blog}
            );

            alert("data saved successfully!");
            router.push('/dashboard/blogs');
        } catch (e) {
            console.log(e);
            alert("Error saving blog post");
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
