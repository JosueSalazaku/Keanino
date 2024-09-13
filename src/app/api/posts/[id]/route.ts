
import { NextResponse } from 'next/server';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema'; 
import { eq } from 'drizzle-orm';
import { Post } from '~/types';

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

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      const updates: Partial<Post> = await request.json() as Partial<Post>;
  
      const updatedPost = await db
        .update(posts)
        .set(updates)
        .where(eq(posts.id, id))
        .returning();
  
      if (updatedPost.length === 0) {
        console.log(`Post with ID ${id} not found for update.`);
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
  
      console.log('Updated post:', updatedPost[0]);
      return NextResponse.json(updatedPost[0]);
    } catch (error) {
      console.error('Error updating post:', error);
      return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
    }
}
  
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
  
      const deletedPost = await db
        .delete(posts)
        .where(eq(posts.id, id))
        .returning();
  
      if (deletedPost.length === 0) {
        console.log(`Post with ID ${id} not found for deletion.`);
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
  
      console.log('Deleted post:', deletedPost[0]);
      return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
    }
  }