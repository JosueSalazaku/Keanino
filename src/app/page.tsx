import Link from "next/link";
import { SignedOut, SignedIn } from '@clerk/nextjs';



export default function HomePage() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-start pt-12 bg-primary text-white">
      <SignedOut>
        <section className="">
          
        </section>
      </SignedOut>
      <SignedIn>
        <section>
          
        </section>
        The 3 P
      </SignedIn>
    </main>
  );
}
