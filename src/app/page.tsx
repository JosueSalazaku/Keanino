import CreatePost from "~/components/createPost";
import { SignedIn, SignedOut } from "@clerk/nextjs"; 

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-12 bg-primary text-white">
      <section className="mt-10 gap-7">
        The 3 P
      </section>

      {/* Show CreatePost when signed in */}
      <SignedIn>
        <section>
          <CreatePost />
        </section>
      </SignedIn>

      {/* Show something else when signed out */}
      <SignedOut>
        <section>
          <p>Please sign in to create a post.</p>
        </section>
      </SignedOut>
    </main>
  );
}
