import Link from "next/link";
import { SignedOut, SignedIn } from '@clerk/nextjs';


export default function HomePage() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-start pt-12 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SignedOut>
        <div>
          Please sign in to view this page
        </div>
      </SignedOut>
      <SignedIn>
      Blog In progress
      </SignedIn>
    </main>
  );
}
