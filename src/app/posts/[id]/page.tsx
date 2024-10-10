"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { PageParams, Post } from '~/types';

export default function Page({ params }: { params: PageParams }) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get<Post>(`/api/posts/${params.id}`);
                setPost(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(`Failed to fetch post: ${error.response?.status} - ${error.message}`);
                } else {
                    setError('Failed to fetch post: An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        }
        void fetchPost();  
    }, [params.id]);
    

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (error) {
        return <div>Error: {error}</div>;  
    }

    return (
        <div>
            <div>My slug is: {params.id}</div>
            {post && (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            )}
        </div>
    );
}
