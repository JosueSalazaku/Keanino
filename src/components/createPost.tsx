/* eslint-disable @typescript-eslint/prefer-optional-chain */
"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; 

export default function CreatePost() {
  const [submitTitle, setSubmitTitle] = useState<string>("");
  const [submitContent, setSubmitContent] = useState<string>("");
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
      userId: user.id, // Add the userId from Clerk
    };

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post("/api/posts", data);

      if (response.status === 200) {
        setSubmitTitle("");
        setSubmitContent("");
      }
    } catch (error) {
      console.error("Error, post not created:", error);
      setError("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handlePost} className="flex flex-col justify-center items-center space-y-8">
      <Input
        value={submitTitle}
        onChange={(event) => setSubmitTitle(event.target.value)}
        className="w-[500px] h-[60px] text-black text-2xl"
        placeholder="Enter post title"
      />
      <Textarea
        value={submitContent}
        onChange={(event) => setSubmitContent(event.target.value)}
        className="w-[500px] h-[360px] text-black text-2xl"
        placeholder="Enter post content"
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button
        type="submit"
        className="w-[120px] h-[45px] bg-white text-primary text-2xl font-bold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
