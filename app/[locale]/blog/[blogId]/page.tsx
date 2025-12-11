"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/supabase/supabase-client";
import { Blog } from "@/types/blog";
import { Loader } from "@/components/ui/loader";

export default function BlogDetails() {
  const { blogId } = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

      if (!error) setBlog(data);
      setLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  if (loading) return <Loader />;

  if (!blog)
    return (
      <p className="px-4 py-10 text-center text-gray-500 text-lg">
        Blog not found.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-3xl mx-auto">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
        {blog.blogTitle}
      </h1>

      {/* Created Date */}
      <p className="text-gray-500 text-sm mb-8">
        Published on {new Date(blog.created_at).toLocaleDateString()}
      </p>

      {/* Content Section */}
      <article className="space-y-6 leading-relaxed text-gray-800">
        {blog.blogContent.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-[17px] md:text-lg leading-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            {paragraph}
          </p>
        ))}
      </article>

      {/* Divider */}
      <div className="my-10 border-t border-gray-300"></div>

      {/* References */}
      {blog.blogReference.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            References
          </h2>

          <ul className="list-disc ml-6 space-y-2 text-blue-700">
            {blog.blogReference.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref}
                  target="_blank"
                  className="hover:underline break-all"
                >
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
