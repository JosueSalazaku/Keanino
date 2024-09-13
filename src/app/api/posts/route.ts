/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema'; 
import type { Post } from '../../../types';

// Handler for GET /api/posts
export async function GET() {
  try {
    const data = await db.select().from(posts);
    console.log('Fetched posts:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

// Handler for POST /api/posts
export async function POST(request: Request) {
  try {
    const post: Post = await request.json();

    const result = await db
      .insert(posts)
      .values({
        title: post.title,
        content: post.content,
        userId: post.userId,
        pictureUrl: post.pictureUrl,
      })
      .returning();

    console.log('Inserted post:', result);
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error adding new post:', error);
    return NextResponse.json({ error: 'Error adding new post' }, { status: 500 });
  }
}
