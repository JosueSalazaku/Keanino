// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "~/server/db"; 
import { users } from "~/server/db/schema"; 
import { eq } from "drizzle-orm";

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
