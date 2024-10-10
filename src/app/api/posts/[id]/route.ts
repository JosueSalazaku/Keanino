import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema'; 
import { eq } from 'drizzle-orm';
import type { Post } from '~/types';
import { getAuth } from '@clerk/nextjs/server';

// GET method to fetch a post by ID
export async function GET(
  request: NextRequest,  // Use NextRequest for consistency
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

// PUT method to update a post by ID
export async function PUT(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates: Partial<Post> = await request.json() as Post;

    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the post to check ownership
    const post = await db
      .select({ userId: posts.userId })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Ensure the user is the owner of the post
    if (!post[0] || post[0].userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Remove createdAt from updates since it should not be changed
    const { createdAt, ...restUpdates } = updates;

    // Update updatedAt with the current timestamp
    const updatedPost = await db
      .update(posts)
      .set({
        ...restUpdates,
        updatedAt: new Date(), // Ensure updatedAt is a valid Date object or SQL
      })
      .where(eq(posts.id, id))
      .returning();

    if (updatedPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPost[0]);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Error updating post' }, { status: 500 });
  }
}


// DELETE method to delete a post by ID
export async function DELETE(
  request: NextRequest,  // Use NextRequest for consistency
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get the current authenticated user from Clerk
    const { userId } =  getAuth(request); 

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the post to check ownership
    const post = await db
      .select({
        userId: posts.userId,
      })
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Check if the current user is the owner of the post
    if (!post[0] || post[0].userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Perform the deletion if the user is the owner
    const deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    if (deletedPost.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    console.log('Deleted post:', deletedPost[0]);
    return NextResponse.json({ message: 'Post deleted successfully', deletedPost: deletedPost[0] });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Error deleting post' }, { status: 500 });
  }
}
