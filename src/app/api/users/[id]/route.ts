import { NextResponse } from "next/server";
import { db } from "~/server/db"; 
import { users } from "~/server/db/schema"; 
import { eq } from "drizzle-orm";
import type { User } from "@clerk/nextjs/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await db.select().from(users).where(eq(users.id, id));
    if (data.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates: Partial<User> = await request.json() as Partial<User>;

    const updatesWithoutNulls = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== null)
    );

    const updatedUser = await db
      .update(users)
      .set(updatesWithoutNulls) // Pass only non-null fields
      .where(eq(users.id, id))
      .returning();

    if (updatedUser.length === 0) {
      console.log(`User with ID ${id} not found for update.`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Updated user:', updatedUser[0]);
    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Perform the delete operation
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (deletedUser.length === 0) {
      console.log(`User with ID ${id} not found for deletion.`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('Deleted user:', deletedUser[0]);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}