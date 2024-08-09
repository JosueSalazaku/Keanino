"use client"
import React, { useState } from "react";
import Link from "next/link";

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-14">
      <Link href="/" className="font-didot text-2xl font-bold text-main">
        Keanino
      </Link>
      <div className="flex flex-row items-center space-x-6">
        <section className="flex flex-row items-center space-x-5 font-semibold text-main">
          <Link href="/People">People</Link>
          <Link href="/Places">Places</Link>
          <Link href="/Pages">Pages</Link>
          <Link href="/signin"><button>Sign In</button></Link>
          <Link href="/login"><button>Log In</button></Link>
        </section>
      </div>
    </nav>
  );
}
