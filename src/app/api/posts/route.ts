import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { posts, users } from '~/server/db/schema'; 
import type { Post } from '../../../types';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const data = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        username: users.username,
        pictureUrl: posts.pictureUrl,
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.clerkId)); 

    console.log('Fetched posts with user info:', data);

    // Return the fetched data
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

// Handler for POST /api/posts
export async function POST(req: Request) {
  try {
    const { title, content, userId } = await req.json() as Post;
    
    if (!title || !content || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newPost = await db.insert(posts).values({
      title,
      content,
      userId, 
    });

    return NextResponse.json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error adding new post:", error);
    return NextResponse.json({ error: "Error adding new post" }, { status: 500 });
  }
}
