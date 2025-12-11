"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import supabase from "@/supabase/supabase-client";
import { FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";

export default function BlogForm() {
  type BlogFormValues = {
    blogTitle: string;
    blogContent: string[];
    blogReference: string[];
    blogContentTemp: string;
    blogReferenceTemp: string;
  };

  const { register, handleSubmit, getValues, setValue, reset, control } =
    useForm<BlogFormValues>({
      defaultValues: {
        blogTitle: "",
        blogContent: [],
        blogReference: [],
        blogContentTemp: "",
        blogReferenceTemp: "",
      },
    });

  const onSubmit = async (data: BlogFormValues) => {
    const { data: blogs, error: e } = await supabase.from("blogs").select("*");
    if (e) console.log(e);
    console.log(blogs);
    const { blogTitle, blogContent, blogReference } = data;
    const blogTableData = { blogTitle, blogContent, blogReference };
    const { error } = await supabase
      .from("blogs")
      .insert(blogTableData)
      .single();
    if (error) {
      console.error("Insert failed:", error.message);
      return;
    }
    reset();
    console.log(blogTableData);
  };

  const blogTitle = useWatch({ control, name: "blogTitle" });
  const blogContent = useWatch({ control, name: "blogContent" });
  const blogReference = useWatch({ control, name: "blogReference" });

  const pushContentIntoArray = (e: FormEvent) => {
    e.preventDefault();
    const temp = getValues("blogContentTemp");
    const current = getValues("blogContent");

    if (!temp.trim()) return;

    setValue("blogContent", [...current, temp]);
    setValue("blogContentTemp", "");
  };

  const pushReferenceIntoArray = (e: FormEvent) => {
    e.preventDefault();
    const temp = getValues("blogReferenceTemp");
    const current = getValues("blogReference");

    if (!temp.trim()) return;

    setValue("blogReference", [...current, temp]);
    setValue("blogReferenceTemp", "");
  };

  return (
    <div className="px-4 py-2 w-[90%]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2 w-[90%] md:w-[60%]">
            <Label>Title</Label>
            <Input
              placeholder="Enter Title..."
              {...register("blogTitle", { required: "Title is required." })}
            />
          </div>

          {/* Content */}
          <div className="md:flex items-center gap-4">
            <div className="flex flex-col gap-2 w-[90%] md:w-[60%]">
              <Label>Contents</Label>
              <Textarea
                className="max-h-5"
                placeholder="Type your content..."
                {...register("blogContentTemp")}
              />
            </div>
            <Button
              onClick={(e) => pushContentIntoArray(e)}
              className="bg-blue-600/80 hover:scale-[1.02] mt-5"
            >
              Push Content
            </Button>
          </div>

          {/* References */}
          <div className="md:flex items-center gap-4">
            <div className="flex flex-col gap-2 w-[90%] md:w-[60%]">
              <Label>References</Label>
              <Input
                placeholder="Add your references..."
                {...register("blogReferenceTemp")}
              />
            </div>
            <Button
              onClick={(e) => pushReferenceIntoArray(e)}
              className="bg-blue-600/80 hover:scale-[1.02] mt-5"
            >
              Push Reference
            </Button>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-blue-600/80 hover:scale-[1.02] mt-5"
            disabled={blogContent.length === 0 || blogTitle.length === 0}
          >
            Post Blog
          </Button>

          <Button
            type="button"
            variant="destructive"
            className="hover:scale-[1.02] mt-5"
            disabled={blogContent.length === 0 || blogTitle.length === 0}
            onClick={() => reset()}
          >
            Clear
          </Button>
        </div>
      </form>

      {/* PREVIEW SECTION */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {/* Content Preview */}
        <div className="border rounded-lg p-4 shadow-sm bg-white max-h-64 overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold mb-3">📝 Content Preview</h2>

          {blogContent.length === 0 ? (
            <p className="text-gray-500">No content added yet.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-3">
              {blogContent.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between gap-3 bg-gray-50 p-2 rounded"
                >
                  <span className="text-gray-800 whitespace-pre-wrap flex-1">
                    {item}
                  </span>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="hover:scale-[1.02]"
                    onClick={() =>
                      setValue(
                        "blogContent",
                        blogContent.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Reference Preview */}
        <div className="border rounded-lg p-4 shadow-sm bg-white max-h-64 overflow-y-auto custom-scrollbar">
          <h2 className="text-xl font-semibold mb-3">🔗 Reference Preview</h2>

          {blogReference.length === 0 ? (
            <p className="text-gray-500">No references added yet.</p>
          ) : (
            <ul className="list-disc pl-5 space-y-3">
              {blogReference.map((ref, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-3 bg-gray-50 p-2 rounded"
                >
                  <span className="text-gray-800 break-all flex-1">{ref}</span>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      setValue(
                        "blogReference",
                        blogReference.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
