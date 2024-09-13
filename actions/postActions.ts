"use server"
import { db } from "../src/server/db/index"
import { posts } from "~/server/db/schema"

export const getAllPosts = async () => {
    try {
        const data = await db.select().from(posts);
        console.log(data)
        return data
    } catch (error) {
        console.error('Error, posts not found');
    }
}

