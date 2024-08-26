"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex h-20 w-full items-center justify-between bg-primary px-14">
      <Link href="/" className="font-didot text-2xl font-bold text-main">
        Keanino
      </Link>
      <button onClick={toggle} className="md:hidden">
        {isOpen ? <IoMdClose className="size-8" /> : <GiHamburgerMenu className="size-8" />}
      </button>
      <div className="hidden md:flex flex-row items-center space-x-6">
        <Link href="/People">People</Link>
        <Link href="/Places">Places</Link>
        <Link href="/Pages">Pages</Link>
        <Link href="/signup">
          <button>Sign up</button>
        </Link>
        <Link href="/login">
          <button>Log In</button>
        </Link>
      </div>

      {/* Sliding Menu for Small Screens */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 z-50 bg-orange-400 p-5 flex flex-col text-6xl space-y-10 text-main md:hidden">
          <Link href="/People">People</Link>
          <Link href="/Places">Places</Link>
          <Link href="/Pages">Pages</Link>
          <Link href="/signup">
            <button>Sign up</button>
          </Link>
          <Link href="/login">
            <button>Log In</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
