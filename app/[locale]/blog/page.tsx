"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase-client";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blogs").select("*");

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data || []);
      }

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="px-4 py-4">Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p className="px-4 py-4">No blogs posted yet.</p>;
  }

  return (
    <div className="px-4 py-6 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>

      {blogs.map((blog) => (
        <a
          key={blog.id}
          // href={`/blogs/${blog.id}`}
          href={`#`}
          className="block border p-4 rounded-lg hover:bg-gray-50 transition"
        >
          <h2 className="text-xl font-semibold">{blog.blogTitle}</h2>
          <p className="text-gray-600 mt-2">
            {blog.blogContent?.[0]?.slice(0, 120)}...
          </p>
        </a>
      ))}
    </div>
  );
}
