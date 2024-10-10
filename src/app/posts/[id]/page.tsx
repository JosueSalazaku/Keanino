"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import type { PageParams, Post } from '~/types';

export default function Page({ params }: { params: PageParams }) {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check if 'params.id' is present
        if (!params.id) {
            setError("No post ID found. Redirecting...");
            router.push('/');  // Redirect to homepage or error page if no ID is found
            return;
        }

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
    }, [params.id, router]);

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (error) {
        return <div>Error: {error}</div>;  
    }

    if (!post) {
        return <div>No post found.</div>; 
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 mb-4">{post.content}</p>
        </div>
    );
}
