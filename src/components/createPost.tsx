"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs'; // Import useUser from Clerk

export default function CreatePost() {
  const [submitTitle, setSubmitTitle] = useState<string>('');
  const [submitContent, setSubmitContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser(); // Get the current user from Clerk

  async function handlePost(event: React.FormEvent) {
    event.preventDefault();

    const title = submitTitle;
    const content = submitContent;

    if (!user?.id) {
      setError('User not authenticated.');
      return;
    }

    const data = {
      title,
      content,
      user_id: user.id, // Add user_id from Clerk's current user
    };

    try {
      setIsSubmitting(true);
      setError(null);

      const post = await axios.post('/api/posts', data); // Make sure /api/posts route exists

      if (post.status === 200) {
        // Clear the form fields if post creation is successful
        setSubmitTitle('');
        setSubmitContent('');
      }

    } catch (error) {
      console.error('Error, post not created:', error);
      setError('Failed to create post. Please try again.');
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
        {isSubmitting ? 'Posting...' : 'Post'}
      </Button>
    </form>
  );
}
