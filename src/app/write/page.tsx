import { SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import CreatePost from '~/components/createPost'
import DisplayPosts from '~/components/DisplayPosts'

export default function page() {
  return (
    <main className="h-screen flex flex-col items-center justify-start bg-primary text-white">
    <section className="mt-10 gap-7">
      The 3 P
    </section>

    {/* Show CreatePost when signed in */}
    <SignedIn>
      <section>
        <CreatePost />
        <DisplayPosts />
      </section>
    </SignedIn>

    {/* Show something else when signed out */}
    <SignedOut>
      <section>
        <p>Please sign in to create a post.</p>
      </section>
    </SignedOut>
  </main>
  )
}

