"use client";
import React, { useEffect, useState } from 'react';
import type { Post } from '~/types';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import DeletePostButton from './deletePostButton';
import { Button } from './ui/button';
import Image from 'next/image'; 
import Link from 'next/link'; 

export default function DisplayPosts() {
  const [showPosts, setShowPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();  // Clerk's user data
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get<Post[]>("/api/posts");
        const data = response.data;
        setShowPosts(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    }
    void fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePostDelete = (id: string) => {
    setShowPosts(showPosts.filter(post => post.id !== id));
  };

  const handlePostEdit = (post: Post) => {
    router.push(`/write?id=${post.id}&title=${encodeURIComponent(post.title)}&content=${encodeURIComponent(post.content)}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Display Posts</h1>
      
      {/* Flex container for posts, stacking vertically */}
      <div className="flex flex-col gap-6 items-center">
        {showPosts.map((post) => (
          <div 
            key={post.id} 
            className="flex flex-col w-full sm:w-[600px] md:w-[800px] lg:w-[900px] xl:w-[1000px] p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
          <div className="flex items-center gap-4 mb-4">
            <Image 
              src={post.pictureUrl || '/default-profile.png'} 
              alt={`${post.username}'s profile picture`}
              width={48}
              height={48}
              className="rounded-full"
              />
                <h3 className="text-lg text-primary font-semibold">{post.username}</h3>
            </div>
            {/* Link makes the entire card clickable */}
            <Link href={`/posts/${post.id}`} className="flex-1 flex flex-col cursor-pointer">
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-700 line-clamp-3">  
                  {post.content}
                </p>
                <p className="text-gray-700">{post.createdAt }</p>
              </div>
            </Link>

            {/* Only show Edit/Delete buttons if the logged-in user is the owner of the post */}
            {post.userId === user?.id && (
              <div className="flex justify-between mt-4">
                <DeletePostButton id={post.id} onDelete={handlePostDelete} />
                <Button
                  onClick={() => handlePostEdit(post)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
