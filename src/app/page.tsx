import { SignedIn, SignedOut } from "@clerk/nextjs";
import DisplayPosts from "~/components/displayPosts";


export default function HomePage() {
  return (
    <main className="h-screen flex flex-col items-center justify-start bg-primary text-white">
    <section className="mt-10 gap-7">
      The 3 P
    </section>
    <SignedIn>
      <section>
        <DisplayPosts />
      </section>
    </SignedIn>
    <SignedOut>
      <section>
        <p>Please sign in to create a post.</p>
      </section>
    </SignedOut>
  </main>
  );
}
