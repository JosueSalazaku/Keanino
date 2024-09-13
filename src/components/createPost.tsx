"use client"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from 'react'
import axios from 'axios'

export default function CreatePost() {
  const [submitTitle, setSubmitTitle] = useState<string>('');
  const [submitContent, setSubmitContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  async function handlePost(event: React.FormEvent) {
    event.preventDefault()
    const title = submitTitle;
    const content = submitContent;
    const data = {title, content}
    
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await axios.post('/api/post', data)
      
      if (response.status === 200) {
        console.log("Post created successfully:", response.data);
        setSubmitTitle('');
        setSubmitContent('');
      }

    } catch (error) {
      console.error("Error, Post not created");
      setError('Failed to create post. Please try again.'); 
    } finally {
      setIsSubmitting(false)
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
        disabled={isSubmitting} // Disable button while submitting
      >
        {isSubmitting ? 'Posting...' : 'Post'}
      </Button>
    </form>
  );
}

 