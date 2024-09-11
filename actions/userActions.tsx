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

export const addUser = async () => {
    try {
        await db.insert(users).values({
            name: "user1",
            email: "feminop843@ploncy.com",
            surname: "surname1",
            username: "username1",
            age: 0,
            password: "password1"
        })
    } catch (error) {
        console.error('Error adding new User!')
    }
    revalidatePath("/")
}

export const getUser = async (userId: number) => {
    try {

    } catch (error) {
        
    }
}