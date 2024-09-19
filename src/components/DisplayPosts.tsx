"use client";
import React, { useEffect, useState } from 'react';
import type { Post } from '~/types';
import axios from 'axios';
import { UserButton } from '@clerk/nextjs';
import DeletePostButton from './deletePostButton';

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

    const handlePostDelete = (id: string) => {
        setShowPosts(showPosts.filter(post => post.id !== id));
    };

    return (
        <div className="gap-10 w-[750px]">
            <h1 className="text-2xl font-bold mb-6">Display Posts</h1>
            <ul className="space-y-9">
                {showPosts.map((post) => (
                    <li
                        key={post.id}
                        className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <UserButton />
                            <h3 className="text-lg text-primary font-semibold">{post.username}</h3>
                        </div>

                        <h2 className="text-xl text-primary font-bold mb-2">{post.title}</h2>
                        <p className="text-gray-700 mb-4">{post.content}</p>

                        <div className="flex justify-end">
                            <DeletePostButton id={post.id} onDelete={handlePostDelete} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
