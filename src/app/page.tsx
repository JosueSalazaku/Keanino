import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import DisplayPosts from "~/components/DisplayPosts";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-start text-white sm:p-8">
      <SignedIn>
        <section className="mt-4 w-full sm:w-auto">
          <DisplayPosts />
        </section>
      </SignedIn>
      <SignedOut>
        <section className="bg relative flex min-h-[80vh] w-full flex-col items-center justify-center px-6 text-center sm:px-12">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-400 opacity-30 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-purple-500 opacity-30 blur-2xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-6xl font-extrabold leading-tight text-white sm:text-8xl">
              Keanino&apos;s Journal
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-100 sm:text-xl">
              A personal diary where Keanino documents thoughts, ideas, and
              reflections on life, growth, and creativity. Dive into a journey
              of inspiration, storytelling, and exploration.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-100 sm:text-xl">
              The focus is on{" "}
              <span className="text-whtie font-bold">People</span>,{" "}
              <span className="text-whtie font-bold">Places</span>, and{" "}
              <span className="text-whtie font-bold">Pages</span>.
            </p>
            <p className="mt-6 text-sm text-gray-300">
              Please{" "}
              <Link href="/sign-in" className="font-black underline">
                sign in
              </Link>{" "}
              to create a post and join the conversation.
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Link href="/sign-in">
                <button className="rounded-lg bg-orange-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-orange-400">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </section>
      </SignedOut>
    </main>
  );
}
