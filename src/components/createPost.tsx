"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useUser } from "@clerk/nextjs";
import SaveCategory from "./SaveCategory";
import { addPost } from "~/app/service/routes";

export default function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  const userId = user?.id

  async function handlePost(event: React.FormEvent) {
    event.preventDefault();

    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", userId);
    formData.append("category", category)

    if (!title || !content || !userId) {
      setError("Missing required fields");
      console.log("Missing required fields:", { title, content, userId });
      return;
    }

    setIsSubmitting(true);
    try {
      await addPost(title, content, userId, category)
      setError(null);

      if (true) {
        setTitle("");
        setContent("");
        setCategory("Choose Category")
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error, post not created or updated:", error);
      setError("Failed to submit the post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 flex w-screen justify-center px-12">
      <form
        onSubmit={handlePost}
        className="flex h-fit  w-screen flex-col space-y-6 bg-white p-4 text-black shadow-lg "
      >
        <Textarea
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full border-b border-none border-black py-4 text-4xl font-bold placeholder-orange-400 focus:outline-none"
          placeholder="Title"
        />

        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="h-[500px] w-full border-none text-xl leading-relaxed placeholder-gray-500 focus:outline-none"
          placeholder="Write your story..."
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className={`h-[50px] w-full rounded-lg bg-primary text-xl font-normal text-white md:w-[200px] ${isSubmitting ? "opacity-70" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Publish"}
        </Button>
        <SaveCategory category={category} setCategory={setCategory} />
      </form>
    </div>
  );
}
