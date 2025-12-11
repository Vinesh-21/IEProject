"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabase/supabase-client";
import Link from "next/link";
import { Blog } from "@/types/blog";
import { Loader } from "@/components/ui/loader"; // <-- add this

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blogs").select("*");

      if (error) console.error(error);
      else setBlogs(data || []);

      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loader size={40} />;

  if (blogs.length === 0) {
    return (
      <p className="px-4 py-4 text-center text-gray-500">
        No blogs posted yet.
      </p>
    );
  }

  return (
    <div className="px-4 py-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 tracking-tight text-gray-900">
        Latest Blogs
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="
              group block rounded-xl p-6 border bg-white shadow-sm 
              hover:shadow-md hover:border-transparent 
              hover:-translate-y-1 transition-all duration-200
            "
          >
            <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-blue-700 transition">
              {blog.blogTitle}
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {blog.blogContent?.[0]?.slice(0, 150)}...
            </p>

            <div className="mt-4 text-blue-600 font-medium group-hover:underline">
              Read more →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
