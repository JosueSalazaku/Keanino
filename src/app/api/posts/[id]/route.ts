// app/api/posts/[id]/route.ts

import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema'; 
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const data = await db.select().from(posts).where(eq(posts.id, id));

    if (data.length === 0) {
      console.log(`Post with ID ${id} not found.`);
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Fetched post:', data[0]);
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Error fetching post' }, { status: 500 });
  }
}
