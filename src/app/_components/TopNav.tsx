import React from "react";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-5">
      <Link href="/" className="font-didot text-2xl font-bold text-main">
        Keanino
      </Link>
      <div className="flex flex-row items-center space-x-6">
        {" "}
        {/* Ensure this div aligns its children vertically in the center */}
        <section className="flex flex-row items-center space-x-5 font-semibold text-main">
          {" "}
          {/* Apply items-center here if necessary */}
          <Link href="/People">People</Link>
          <Link href="/Places">Places</Link>
          <Link href="/Pages">Pages</Link>
        </section>
      </div>
    </nav>
  );
}
