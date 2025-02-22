"use client";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function CreatePost() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const initialTitle = searchParams.get('title');
  const initialContent = searchParams.get('content');

  const [submitTitle, setSubmitTitle] = useState<string>(initialTitle ?? "");
  const [submitContent, setSubmitContent] = useState<string>(initialContent ?? "");  
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
    formData.append('title', submitTitle);
    formData.append('content', submitContent);
    formData.append('userId', user.id);
    if (image) {
      formData.append('image', image); 
    }

    try {
      setIsSubmitting(true);
      setError(null);

      let response;

      if (id) {
        response = await axios.put(`/api/posts/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post("/api/posts", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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

  // async function handleImageSubmit(event: React.ChangeEvent<HTMLInputElement>) {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //   }
  // }

  return (
    <div className="w-screen flex justify-center mt-8 px-12">
      <form 
        onSubmit={handlePost} 
        className="w-screen h-fit  flex flex-col space-y-6 p-4 bg-white text-black shadow-lg "
      >
        <Textarea
          value={submitTitle}
          onChange={(event) => setSubmitTitle(event.target.value)}
          className="w-full text-4xl font-bold border-none focus:outline-none placeholder-orange-400 py-4 border-b border-black"
          placeholder="Title"
        />
        {/* <input type="file"  accept='image/*' onChange={handleImageSubmit}/>
        {preview && <Image src={preview} alt="Preview" className="preview-image" width={500} height={500} />} */}
        
        <Textarea
          value={submitContent}
          onChange={(event) => setSubmitContent(event.target.value)}
          className="w-full h-[500px] text-xl leading-relaxed border-none focus:outline-none placeholder-gray-500"
          placeholder="Write your story..."
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className={`w-full md:w-[200px] h-[50px] bg-primary text-white text-xl font-normal rounded-lg ${isSubmitting ? 'opacity-70' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : id ? 'Update Post' : 'Publish'}
        </Button>
      </form>
    </div>
  );
}
