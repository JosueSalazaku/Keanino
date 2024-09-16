"use client";
import React, { useEffect, useState } from 'react';
import type { Post } from '~/types';
import axios from 'axios';

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
        <div>
            <h1>Display Posts</h1>
            <ul>
                {showPosts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>  
                        <p>{post.content}</p> 
                        <small>Posted by {post.username}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
