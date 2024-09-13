/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";
import { db } from "~/server/db"; 
import { users } from "~/server/db/schema"; 

export async function GET() {
  try {
    const data = await db.select().from(users);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await request.json();
    const result = await db
      .insert(users)
      .values({
        name: user.name,
        firstName: user.firstName,
        username: user.username,
        email: user.email,
        clerkId: user.clerkId,
        picture: user.picture,
      })
      .returning({ clerkClientId: users.clerkId });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding new user:", error);
    return NextResponse.json({ error: "Error adding new user" }, { status: 500 });
  }
}
