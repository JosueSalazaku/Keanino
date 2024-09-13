/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { eq } from "drizzle-orm";
import { db } from "../src/server/db/index"
import { users } from "../src/server/db/schema"


export const getAllUsers = async () => {
    try {
        const data = await db.select().from(users);
        console.log(data)
        return data
    } catch (error) {
        console.error('Error, users not found')
    }

}

export const getUser = async (userId: string) => { 
  try {
    const data = await db.select().from(users).where(eq(users.id, userId));
    console.log(data)
    return data; 
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; 
  }
};

export const addUser = async (user: any) => {
    try {
      const result = await db
        .insert(users)
        .values({
          name: user?.name,
          firstName: user?.firstName,
          username: user?.username,
          email: user?.email,
          clerkId: user?.clerkId,
          picture: user?.picture,
        })
        .returning({ clerkClientId: users.clerkId }); 
  
      console.log('Inserted user:', result);
    } catch (error) {
      console.error('Error adding new user:', error);
    }
  };
  
