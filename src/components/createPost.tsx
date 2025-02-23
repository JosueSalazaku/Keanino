"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import SaveCategory from "./SaveCategory";

export default function CreatePost() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const initialTitle = searchParams.get("title");
  const initialContent = searchParams.get("content");

  const [submitTitle, setSubmitTitle] = useState<string>(initialTitle ?? "");
  const [submitContent, setSubmitContent] = useState<string>(
    initialContent ?? "",
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { user } = useUser();

  async function handlePost(event: React.FormEvent) {
    event.preventDefault();

    if (!user?.id) {
      setError("User not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("title", submitTitle);
    formData.append("content", submitContent);
    formData.append("userId", user.id);
    // formData.append("categroy", posts.categroy)
    if (image) {
      formData.append("image", image);
    }

    try {
      setIsSubmitting(true);
      setError(null);

      let response;

      if (id) {
        response = await axios.put(`/api/posts/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        response = await axios.post("/api/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (response.status === 200) {
        setSubmitTitle("");
        setSubmitContent("");
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error, post not created or updated:", error);
      setError("Failed to submit the post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // async function handleImageSubmit(event: React.ChangeEvent<HTMLInputElement>) {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // }

  return (
    <div className="mt-8 flex w-screen justify-center px-12">
      <form
        onSubmit={handlePost}
        className="flex h-fit  w-screen flex-col space-y-6 bg-white p-4 text-black shadow-lg "
      >
        <Textarea
          value={submitTitle}
          onChange={(event) => setSubmitTitle(event.target.value)}
          className="w-full border-b border-none border-black py-4 text-4xl font-bold placeholder-orange-400 focus:outline-none"
          placeholder="Title"
        />
        {/* <input type="file"  accept='image/*' onChange={handleImageSubmit}/>
        {preview && <Image src={preview} alt="Preview" className="preview-image" width={500} height={500} />} */}

        <Textarea
          value={submitContent}
          onChange={(event) => setSubmitContent(event.target.value)}
          className="h-[500px] w-full border-none text-xl leading-relaxed placeholder-gray-500 focus:outline-none"
          placeholder="Write your story..."
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className={`h-[50px] w-full rounded-lg bg-primary text-xl font-normal text-white md:w-[200px] ${isSubmitting ? "opacity-70" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : id ? "Update Post" : "Publish"}
        </Button>
        <SaveCategory />
      </form>
    </div>
  );
}
