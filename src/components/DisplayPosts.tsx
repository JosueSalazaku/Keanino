"use client";
import React, { useEffect, useState } from 'react';
import type { Post } from '~/types';
import axios from 'axios';
import { UserButton } from '@clerk/nextjs';

export default function DisplayPosts() {
    const [showPosts, setShowPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get<Post[]>("/api/posts");
                const data = response.data;
                console.log(data);
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

    return (
        <div className='gap-10'>
            <h1>Display Posts</h1>
            <ul>
                {showPosts.map((post) => (
                    <li key={post.id}>
                      <li className=' flex flex-row gap-5 item center'> <UserButton/> <h3>{post.username}</h3></li>
                        <h2>{post.title}</h2>  
                        <p>{post.content}</p> 
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}
