"use client"
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
                    <div key={post.id}>
                        <li>{post.title}</li>
                        <li>{post.content}</li>
                        <li>{post.username}</li>
                    </div>
                ))}
            </ul>
        </div>
    );
}
