import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { posts } from './schema'
import { Post } from '~/types'



const connectionString = process.env.DATABASE_URL ?? ''
const client = postgres(connectionString)
const db = drizzle(client);


const allPosts = await db.select().from(posts);