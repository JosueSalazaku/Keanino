import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '~/server/db';
import { posts, users } from '~/server/db/schema'; 
import { eq } from 'drizzle-orm';


export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

export async function GET() {
  try {
    const data = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        username: users.username,
        pictureUrl: users.pictureUrl,
        imageUrl: posts.imageUrl,
        category: posts.category,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.clerkId));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const userId = formData.get('userId') as string;
    const category = formData.get('category') as string

    // Check if required fields are present
    if (!title || !content || !userId) {
      console.error('Missing required fields:', { title, content, userId });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert the new post into the database
    const [newPost] = await db.insert(posts).values({
      title,
      content,
      userId,
      category,
      imageUrl: '', // Skip image logic, default to empty string
    }).returning();

    return NextResponse.json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Error creating post' }, { status: 500 });
  }
}

