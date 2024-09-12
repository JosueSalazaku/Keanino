"use server"

import { db } from "../src/server/db/index"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { users } from "../src/server/db/schema";
import type { User } from "../src/types"

export const getAllUsers = async () => {
    try {
        const data = await db.select().from(users);
        console.log(data)
        return data
    } catch (error) {
        console.error('Error, users not found')
    }

}

export const addUser = async (user: User) => {
    try {
        await db.insert(users).values({
            name: user?.name,
            firstName: user?.firstName,
            username: user?.username,
            email: user?.email,
            clerkId: user?.clerkId,
            picture: user?.picture,
            password: user?.password,
        })
    } catch (error) {
        console.error('Error adding new User!')
    }
    revalidatePath("/")
}

// export const getUser = async (userId: number) => {
//     try {

//     } catch (error) {
        
//     }
// }