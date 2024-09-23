/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function CreatePost() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const initialTitle = searchParams.get('title');
  const initialContent = searchParams.get('content');

  const [submitTitle, setSubmitTitle] = useState<string>(initialTitle || "");
  const [submitContent, setSubmitContent] = useState<string>(initialContent || "");  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser(); 

  async function handlePost(event: React.FormEvent) {
    event.preventDefault();

    if (!user || !user.id) {
      setError("User not authenticated.");
      return;
    }

    const data = {
      title: submitTitle,
      content: submitContent,
      userId: user.id, 
    };

    try {
      setIsSubmitting(true);
      setError(null);

      let response;

      if (id) {
        response = await axios.put(`/api/posts/${id}`, data);
      } else {
        response = await axios.post("/api/posts", data);
      }

      if (response.status === 200) {
        setSubmitTitle("");
        setSubmitContent("");
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error, post not created or updated:", error);
      setError("Failed to submit the post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handlePost} className="w-full h-full flex flex-col justify-center items-center space-y-8 p-4">
      <Input
        value={submitTitle}
        onChange={(event) => setSubmitTitle(event.target.value)}
        className="w-full md:w-[500px] h-[60px] text-black text-2xl"
        placeholder="Enter post title"
      />
      <Textarea
        value={submitContent}
        onChange={(event) => setSubmitContent(event.target.value)}
        className="w-full md:w-[500px] h-[360px] text-black text-2xl"
        placeholder="Enter post content"
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        type="submit"
        className="w-full md:w-[120px] h-[45px] bg-white text-primary text-2xl font-bold"
        disabled={isSubmitting}
      >
         {isSubmitting ? 'Submitting...' : id ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  );
}
